import { Elysia } from 'elysia';
import { helloWorld } from "./routesConfig";

export const helloWorldRouter = new Elysia();

helloWorldRouter.get('/helloWorld/:id', c => {
  return {
    id: c.params.id
  }
}, helloWorld);

