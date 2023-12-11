import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { router } from "./routes/router";

export const app = new Elysia();

app.use(swagger());

app.use(router);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
