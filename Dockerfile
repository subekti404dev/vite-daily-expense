FROM oven/bun:latest as builder
WORKDIR /app
COPY backend /app/backend
COPY frontend /app/frontend

RUN cd /app/backend && \
    bun i && bun run build && \
    bun run build:bin

RUN cd /app/frontend && \
    bun i && bun run build 

FROM ubuntu:latest
WORKDIR /app
COPY --from=builder /app/frontend/dist /app/web
COPY --from=builder /app/backend/single/dew /usr/local/bin/dew
RUN chmod +x /usr/local/bin/dew

EXPOSE ${PORT:-7000}
CMD ["/usr/local/bin/dew"]
