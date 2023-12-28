import { Pool, QueryConfig } from 'pg';
import { IPostgresQueryOptions } from './interfaces';
import { TPostgresResult } from './types';

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;

console.info('Creating a Postgres Pool ...');
const pool = new Pool({
	host: POSTGRES_HOST,
	port: Number(POSTGRES_PORT),
	user: POSTGRES_USERNAME,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DATABASE,
	max: 100,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000
});
console.info('Postgres Pool created.');

await pool.query('');

export const executeQueryPostgres = async (prop: IPostgresQueryOptions): Promise<TPostgresResult> => {
	const client = await pool.connect();
	try {
		const { sql, binds } = prop;
		const result = await pool.query(sql, binds);
		return result;
	} catch (error) {
		console.error(`Error in executeQuery: ${error}`);
		throw new Error(`Error in executeQuery: ${error}`);
	} finally {
		client.release();
	}
};
