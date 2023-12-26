import { Elysia } from 'elysia';
import * as repository from './repository'
import { helloWorldConfig } from './routesConfig';

export const helloWorldController = (app: Elysia) => {
    app.get('/helloWorld/:id', async c => {
        try {
            const result = await repository.helloWorld();
            return {
                status: true,
                message: 'Success in helloWorld',
                data: result
            }
        } catch (error) {
            return {
                status: false,
                message: `error in helloWorld: ${error}`,
                data: null
            }
        }
    }, helloWorldConfig)
}
