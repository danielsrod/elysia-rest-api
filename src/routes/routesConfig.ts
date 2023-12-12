import { t } from 'elysia';

export const helloWorld = {
    params: t.Object({
        id: t.String()
    }, { description: 'hello world route' }),
    response: {}
}