import { Elysia } from 'elysia';
import { helloWorldConfig } from '../routes/routesConfig';
import * as helloWorldController from '../controller/index';

export const helloWorldRouter = new Elysia();

helloWorldRouter.get(
    '/helloWorld/:id',
    async c => {
        return await helloWorldController.helloWorld(c);
    },
    helloWorldConfig,
);