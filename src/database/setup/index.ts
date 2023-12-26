import oracledb, { ExecuteOptions, OUT_FORMAT_OBJECT, PoolAttributes, createPool } from 'oracledb';

import { IOracleQueryOptions } from './interfaces';
import { OracleResult } from './types';

const { ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECTIONSTRING } = process.env;

const options: PoolAttributes = {
	user: ORACLE_USER,
	password: ORACLE_PASSWORD,
	connectionString: ORACLE_CONNECTIONSTRING
};

const executeOptions: ExecuteOptions = {
	autoCommit: true,
	outFormat: OUT_FORMAT_OBJECT
};

console.info('Creating a Oracle Pool ...');
await createPool(options);
console.info('Oracle Pool created.');

export const executeQueryOracle = async (prop: IOracleQueryOptions): Promise<OracleResult> => {
	const pool = await oracledb.getConnection();
	try {
		const { sql, binds } = prop;
		const result = await pool.execute(sql, binds, executeOptions);
		return result;
	} catch (error) {
		console.error(`Error in executeQuery: ${error}`);
		throw new Error(`Error in executeQuery: ${error}`);
	} finally {
		// console.info('fechando conexao')
		await pool.close();
	}
};
