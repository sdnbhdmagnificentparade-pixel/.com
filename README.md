# DANAGO Pay

The DANAGO Pay website runs as a dependency-free Node.js service.

## Alloy development

Start the checked-in Alloy stack:

```sh
docker compose -f docker-compose.alloy.yaml up -d
```

The site listens on port `3000`. Alloy proxies the preview from
`http://localhost:8080`.

Check service status with:

```sh
docker compose -f docker-compose.alloy.yaml ps
```
