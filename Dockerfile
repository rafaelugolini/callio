FROM hayd/deno:debian-1.4.3

EXPOSE 3000

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (this is re-run only when deps.ts is modified).
# Ideally this will download and compile _all_ external files used in main.ts.
COPY deps.ts /app
RUN deno cache --unstable deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD ./src /app/src
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache --unstable ./src/index.ts

# These are passed as deno arguments when run with docker:
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-run", "--unstable", "./src/index.ts", "/app/scripts"]
