import { BIND_IN, NUMBER, STRING, BIND_OUT } from 'oracledb';
import { handleExecuteQuery } from '../../database/setup/handler';
import { IOracleBinds } from '../../database/setup/types';

export const helloWorld = async () => {
	try {
		const sql = `
            select 'hello world' as ds_text from dual
        `;
		const binds: IOracleBinds = {};
		const result = await handleExecuteQuery({ sql, binds });
		return result;
		// biome-ignore lint: error is scuffed
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
};
