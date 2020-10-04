# Callio

**⚠️: Project still under development**

Callio idea is to expose scripts over HTTP. The primary use case is to have an easy integration between a CICD system and a server without SSH sessions..

## Getting Started

```bash
# Cache all deps
deno cache --unstable ./deps.ts

# Format
deno fmt src

# Run
deno run --allow-net --allow-env --allow-read --allow-run --unstable src/index.ts
```

### Docker

```bash
# Build
docker build -t callio .

# Run
docker run \
  -ti \
  --rm \
  -e CALLIO_SECRET=<SECRET> \
  -p 3000:3000 \
  --name callio \
  -v $(pwd)/scripts:/app/scripts \
  ghcr.io/rafaelugolini/callio:latest
```
