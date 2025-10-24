#!/bin/bash

# Script de Deploy Completo para Produção
# Uso: ./deploy.sh [--ssl] [--email seu-email@exemplo.com]

set -e

# Configurações padrão
DOMAIN="unitinscti.com.br"
EMAIL="admin@unitinscti.com.br"
SETUP_SSL=false

# Parse dos argumentos
while [[ $# -gt 0 ]]; do
    case $1 in
        --ssl)
            SETUP_SSL=true
            shift
            ;;
        --email)
            EMAIL="$2"
            shift 2
            ;;
        *)
            echo "Uso: $0 [--ssl] [--email seu-email@exemplo.com]"
            exit 1
            ;;
    esac
done

echo "🚀 Iniciando deploy da aplicação..."
echo "📧 Email: $EMAIL"
echo "🌐 Domínio: $DOMAIN"
echo "🔐 SSL: $SETUP_SSL"

# Verifica se o Docker está instalado e rodando
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Instale o Docker primeiro."
    exit 1
fi

if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker e tente novamente."
    exit 1
fi

# Para containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down 2>/dev/null || true
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true

# Remove imagens antigas para forçar rebuild
echo "🧹 Limpando imagens antigas..."
docker image prune -f

# Build da aplicação
echo "🔨 Fazendo build da aplicação..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Cria arquivo .env.production se não existir
if [ ! -f .env.production ]; then
    echo "📝 Criando arquivo .env.production..."
    cp .env.production.example .env.production
    echo "⚠️  Lembre-se de configurar as variáveis em .env.production"
fi

if [ "$SETUP_SSL" = true ]; then
    echo "🔐 Configurando SSL..."
    
    # Cria diretórios para certificados
    mkdir -p ./certbot/conf
    mkdir -p ./certbot/www
    
    # Inicia apenas o Nginx para o challenge do Let's Encrypt
    echo "🔧 Iniciando Nginx temporário..."
    docker-compose -f docker-compose.prod.yml up -d nginx
    
    # Aguarda inicialização
    sleep 15
    
    # Testa se o Nginx está respondendo
    if ! curl -f http://localhost/health > /dev/null 2>&1; then
        echo "⚠️  Nginx não está respondendo, tentando novamente..."
        sleep 10
    fi
    
    # Obtém certificados SSL
    echo "🔐 Obtendo certificados SSL..."
    docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --non-interactive \
        -d $DOMAIN \
        -d www.$DOMAIN
    
    if [ $? -eq 0 ]; then
        echo "✅ Certificados SSL obtidos com sucesso!"
        
        # Para o Nginx temporário
        docker-compose -f docker-compose.prod.yml down
        
        # Inicia aplicação completa com SSL
        echo "🚀 Iniciando aplicação com SSL..."
        docker-compose -f docker-compose.prod.yml up -d
        
        # Configura renovação automática
        echo "⚙️  Configurando renovação automática..."
        (crontab -l 2>/dev/null | grep -v "certbot renew"; echo "0 12 * * * cd $(pwd) && docker-compose -f docker-compose.prod.yml run --rm certbot renew --quiet && docker-compose -f docker-compose.prod.yml restart nginx") | crontab -
        
    else
        echo "❌ Erro ao obter certificados SSL"
        echo "🔄 Iniciando sem SSL..."
        docker-compose -f docker-compose.prod.yml down
        docker-compose -f docker-compose.prod.yml up -d
    fi
else
    echo "🚀 Iniciando aplicação sem SSL..."
    docker-compose -f docker-compose.prod.yml up -d
fi

# Aguarda a aplicação inicializar
echo "⏳ Aguardando aplicação inicializar..."
sleep 30

# Verifica se a aplicação está rodando
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Deploy concluído com sucesso!"
    echo ""
    echo "🌐 Aplicação disponível em:"
    if [ "$SETUP_SSL" = true ]; then
        echo "   - https://$DOMAIN"
        echo "   - https://www.$DOMAIN"
    else
        echo "   - http://$DOMAIN"
        echo "   - http://www.$DOMAIN"
    fi
    echo ""
    echo "📊 Status dos containers:"
    docker-compose -f docker-compose.prod.yml ps
    echo ""
    echo "📝 Para ver os logs:"
    echo "   docker-compose -f docker-compose.prod.yml logs -f"
    echo ""
    echo "🔄 Para reiniciar:"
    echo "   docker-compose -f docker-compose.prod.yml restart"
else
    echo "❌ Erro no deploy. Verificando logs..."
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi