FROM node:16-alpine3.18 as be_builder
WORKDIR /app
COPY backend /app/backend
RUN  npm install -g pnpm@7.26.3 && cd /app/backend && pnpm i && pnpm run build 

FROM node:16-alpine3.18 as fe_builder
WORKDIR /app
COPY frontend /app/frontend
RUN npm install -g pnpm@7.26.3 && cd /app/frontend && pnpm i && pnpm run build 

FROM alpine:latest
WORKDIR /app
COPY --from=be_builder /app/backend/app /usr/local/bin/dew
COPY --from=fe_builder /app/frontend/dist /app/web
EXPOSE ${PORT:-7000}
CMD ["dew"]