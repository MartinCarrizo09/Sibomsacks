# syntax=docker/dockerfile:1

# ---- Etapa 1: build del frontend (Vite/React) ----
FROM node:20-slim AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---- Etapa 2: dependencias de produccion del backend ----
FROM node:20-slim AS deps
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

# ---- Etapa 3: runtime ----
FROM node:20-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app/backend

COPY --from=deps /app/backend/node_modules ./node_modules
COPY backend/ ./
# El SPA compilado se sirve desde backend/dist
COPY --from=frontend /app/frontend/dist ./dist

# Copia semilla de las bases SQLite: se usa para poblar el volumen la primera vez
RUN mkdir -p /app/seed-data && cp data/*.sqlite /app/seed-data/

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "app.js"]
