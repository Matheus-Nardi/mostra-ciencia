#!/bin/bash

set -e

# Script de restart rápido: derruba containers e volumes e sobe novamente.
# Uso: ./scripts/restart.sh [--no-cache] [--prune] [--file docker-compose.prod.yml]

COMPOSE_FILE="docker-compose.prod.yml"
NO_CACHE=false
PRUNE_IMAGES=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --no-cache)
      NO_CACHE=true
      shift
      ;;
    --prune)
      PRUNE_IMAGES=true
      shift
      ;;
    --file)
      COMPOSE_FILE="$2"
      shift 2
      ;;
    *)
      echo "Uso: $0 [--no-cache] [--prune] [--file docker-compose.prod.yml]"
      exit 1
      ;;
  esac
done

# Verifica Docker
if ! command -v docker &> /dev/null; then
  echo "❌ Docker não está instalado."
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker não está rodando."
  exit 1
fi

echo "🛑 Parando containers e removendo volumes..."
docker-compose -f "$COMPOSE_FILE" down -v || true

if [ "$PRUNE_IMAGES" = true ]; then
  echo "🧹 Limpando imagens antigas..."
  docker image prune -f || true
fi

echo "🚀 Subindo containers (com build)..."
if [ "$NO_CACHE" = true ]; then
  echo "🏗️  Construindo imagens sem cache..."
  docker-compose -f "$COMPOSE_FILE" build --no-cache
else
  echo "🏗️  Construindo imagens..."
  docker-compose -f "$COMPOSE_FILE" build
fi

echo "🚀 Subindo containers..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "⏳ Aguardando inicialização..."
sleep 20

echo "📊 Status dos containers:"
docker-compose -f "$COMPOSE_FILE" ps

echo "✅ Restart concluído."
