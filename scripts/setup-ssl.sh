#!/bin/bash

# Script para configuração automática do SSL com Let's Encrypt
# Uso: ./setup-ssl.sh seu-email@exemplo.com

set -e

EMAIL=${1:-"italobeckmann@gmail.com"}
DOMAIN="unitinscti.com.br"
WWW_DOMAIN="www.unitinscti.com.br"

echo "🚀 Iniciando configuração SSL para $DOMAIN"

# Verifica se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker e tente novamente."
    exit 1
fi

# Cria diretórios necessários
echo "📁 Criando diretórios para certificados..."
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

# Para na aplicação se estiver rodando
echo "🛑 Parando containers existentes..."
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true

# Inicia apenas o Nginx temporariamente para o challenge
echo "🔧 Iniciando configuração temporária..."
docker-compose -f docker-compose.prod.yml up -d nginx

# Aguarda o Nginx inicializar
echo "⏳ Aguardando Nginx inicializar..."
sleep 10

# Executa o Certbot para obter certificados
echo "🔐 Obtendo certificados SSL..."
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d $DOMAIN \
    -d $WWW_DOMAIN

if [ $? -eq 0 ]; then
    echo "✅ Certificados SSL obtidos com sucesso!"
    
    # Para todos os containers
    docker-compose -f docker-compose.prod.yml down
    
    # Inicia a aplicação completa com SSL
    echo "🚀 Iniciando aplicação com SSL..."
    docker-compose -f docker-compose.prod.yml up -d
    
    echo "🎉 Configuração SSL concluída!"
    echo "🌐 Sua aplicação está disponível em:"
    echo "   - https://$DOMAIN"
    echo "   - https://$WWW_DOMAIN"
    
    # Configura renovação automática
    echo "⚙️  Configurando renovação automática..."
    (crontab -l 2>/dev/null; echo "0 12 * * * cd $(pwd) && docker-compose -f docker-compose.prod.yml run --rm certbot renew --quiet && docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload") | crontab -
    
    echo "✅ Renovação automática configurada (diariamente às 12h)"
    
else
    echo "❌ Erro ao obter certificados SSL"
    echo "🔍 Verifique se:"
    echo "   - O domínio $DOMAIN aponta para este servidor"
    echo "   - As portas 80 e 443 estão abertas"
    echo "   - O DNS está propagado corretamente"
    exit 1
fi