FROM node:16-alpine3.18 as be_builder
WORKDIR /app
COPY backend /app
RUN cd /app/backend && npm run i && npm run build 

FROM node:16-alpine3.18 as fe_builder
WORKDIR /app
COPY frontend /app
RUN cd /app/frontend && npm run i && npm run build 

FROM alpine:latest
WORKDIR /app
COPY --from=be_builder /app/backend/app /usr/local/bin/dew
COPY --from=fe_builder /app/frontend/dist /app/web
EXPOSE ${PORT:-7000}
CMD ["dew"]