import { handleExecuteQuery } from '../../database/setup/handler';
import { TPostgresBinds } from '../../database/setup/types';

export const helloWorld = async () => {
	try {
		const sql = `
            select 'hello world' as ds_text
        `;
		const binds: TPostgresBinds = [];
		const result = await handleExecuteQuery({ sql, binds });
		return result;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};
