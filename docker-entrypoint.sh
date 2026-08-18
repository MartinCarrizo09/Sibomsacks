#!/bin/sh
set -e

# El volumen de Railway se monta vacio y tapa los .sqlite de la imagen.
# Copiamos la semilla solo si el archivo todavia no existe en el volumen.
DATA_DIR="${SQLITE_DATA_DIR:-/app/backend/data}"
mkdir -p "$DATA_DIR"

for seed in /app/seed-data/*.sqlite; do
  [ -e "$seed" ] || continue
  name=$(basename "$seed")
  if [ ! -f "$DATA_DIR/$name" ]; then
    echo "📦 Sembrando $name en $DATA_DIR"
    cp "$seed" "$DATA_DIR/$name"
  fi
done

exec "$@"
