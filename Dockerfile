FROM node:16-alpine3.18 as be_builder
WORKDIR /app
COPY backend /app/backend
RUN npm install -g pnpm@7.26.3 && \
    cd /app/backend && pnpm i && pnpm run build && \
    npm run build:bin || true
FROM node:16-alpine3.18 as fe_builder
WORKDIR /app
COPY frontend /app/frontend
RUN npm install -g pnpm@7.26.3 && cd /app/frontend && pnpm i && pnpm run build 

FROM node:16-alpine3.18
WORKDIR /app
COPY --from=fe_builder /app/frontend/dist /app/web
COPY --from=be_builder /app/backend/single/* /app/
COPY scripts/run_inside_docker.sh /usr/local/bin/run-dew
RUN chmod +x /usr/local/bin/run-dew

EXPOSE ${PORT:-7000}
CMD ["run-dew"]