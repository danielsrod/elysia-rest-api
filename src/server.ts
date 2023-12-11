import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { router } from "./routes/router";
import { swagger } from "@elysiajs/swagger";

export const app = new Elysia();

app.use(swagger());
app.use(cors());
app.use(router);

app.listen(3000);

console.info(`🦊 Running at ${app.server?.hostname}:${app.server?.port}\n`);
