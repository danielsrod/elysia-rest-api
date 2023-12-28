import { t } from 'elysia';

export const helloWorldConfig = {
	params: t.Object({
		id: t.String()
	})
};
