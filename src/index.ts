import { Application } from "../deps.ts";

import { handleAuthHeader, handleErrors } from "./middlewares.ts";

import { getRouter } from "./runner.ts";

import { getDirectory } from "./utils.ts";

const app = new Application();
const port = 3000;

app.use(handleAuthHeader);
app.use(handleErrors);

const router = await getRouter(getDirectory());

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server started on port ${port}`);

await app.listen({ port });
