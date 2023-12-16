import { Elysia } from 'elysia';
import { helloWorldRouter } from '../modules/HelloWorld/routes/index';

export const router = new Elysia();

router.use(helloWorldRouter);
// ...
