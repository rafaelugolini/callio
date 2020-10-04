import { Context, walk, Router } from "../deps.ts";

const decode = (input: Uint8Array) =>
  new TextDecoder().decode(input).split("\n");

const runner = (path: string) =>
  async (ctx: Context) => {
    let cmd: Deno.Process<{
      cmd: [string];
      stdout: "piped";
      stderr: "piped";
    }>;
    try {
      cmd = Deno.run({
        cmd: [path],
        stdout: "piped",
        stderr: "piped",
      });
    } catch {
      ctx.response.status = 500;
      ctx.response.body = {
        message: "Error while trying to run the script",
      };
      return;
    }

    const status = await cmd.status();
    cmd.close();

    const stdout = await cmd.output();
    const stderr = await cmd.stderrOutput();

    if (status.success) {
      ctx.response.status = 200;
    } else {
      ctx.response.status = 500;
    }

    ctx.response.body = {
      stdout: decode(stdout),
      stderr: decode(stderr),
    };
  };

export async function getRouter(directory: string) {
  const router = new Router();

  for await (const entry of walk(directory, { includeDirs: false })) {
    const path = entry.path.substr(directory.length);
    console.log(`Adding route => ${path}`);
    router.get(path, runner(entry.path));
  }

  return router;
}
