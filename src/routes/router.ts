import { Elysia } from 'elysia';
import { helloWorldController } from '../modules/HelloWorld/controller';

export const router = new Elysia();

router.use(helloWorldController as any);
// ...
