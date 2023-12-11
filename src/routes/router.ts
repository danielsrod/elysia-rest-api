import { Elysia } from 'elysia';
import { helloWorldRouter } from './helloWorld.router';

export const router = new Elysia();

router.use(helloWorldRouter);
// ...
