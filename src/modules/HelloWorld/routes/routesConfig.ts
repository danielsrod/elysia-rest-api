import { t } from 'elysia';
import { MergeSchema, UnwrapRoute } from 'elysia';

export const helloWorldConfig = {
    params: t.Object({
        id: t.String()
    }, { description: 'Hello World params for test' }),
    set: {
        cookie: {},
        headers: {},
        status: 200
    }
}

export type ThelloWorldConfig = Omit<MergeSchema<typeof helloWorldConfig, typeof helloWorldConfig>, 'response'>

/*
(parameter) c: {
    set: {
        ...;
    };
    path: string;
    request: Request;
    store: {};
}
*/