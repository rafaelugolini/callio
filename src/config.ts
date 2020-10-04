import "https://deno.land/x/dotenv/load.ts";
import type { Config } from "./types.ts";
import { envConfig } from "../deps.ts";

envConfig();

export const config: Config = {
  secret: Deno.env.get("CALLIO_SECRET")!,
};
