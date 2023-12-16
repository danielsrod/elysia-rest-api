import { Elysia } from 'elysia';
import { helloWorld } from "../../../routes/routesConfig";
import * as helloWorldController from '../controller/index'

export const helloWorldRouter = new Elysia();

helloWorldRouter.get('/helloWorld/:id', c => {
  return {
    id: c.params.id
  }
}, helloWorld);

