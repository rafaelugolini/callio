import { Context, createHttpError } from "../deps.ts";
import { config } from "./config.ts";

export async function handleAuthHeader(
  ctx: Context,
  next: () => Promise<void>,
) {
  try {
    const { request, state } = ctx;

    const secret = request.headers.get("x-callio_secret") || "";

    if (secret !== config.secret) {
      throw createHttpError(403, "Permission Denied");
    }

    await next();
  } catch (error) {
    throw error;
  }
}

export async function handleErrors(ctx: Context, next: () => Promise<void>) {
  try {
    await next();
  } catch (err) {
    console.log(err.status);

    ctx.response.status = err.status || 500;
    const { message = "unknown error", status = 500, stack = null } = err;
    ctx.response.body = { message };
    ctx.response.type = "json";
  }
}
