import { t } from 'elysia';
import { type Context } from 'elysia';

export const helloWorldConfig = {
	params: t.Object({
		id: t.String()
	})
};

export type ThelloWorldConfig = Context & {
	params: { id: string };
};
