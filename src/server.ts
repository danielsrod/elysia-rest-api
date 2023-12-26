import { logger } from '@bogeychan/elysia-logger';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { router } from './routes/router';

const { PORT } = process.env;
export const app = new Elysia();

app.use(swagger());
app.use(logger());
app.use(cors());
app.use(router);

app.listen(Number(PORT) | 3000);

console.info(`🦊 Running at ${app.server?.hostname}:${app.server?.port}\n`);
