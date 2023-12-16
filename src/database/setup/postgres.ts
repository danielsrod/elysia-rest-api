import { Pool, QueryResult } from "pg";

import { postgresBinder } from './binders'

import { 
    IgenericDatabaseQueryOptions,
    IdatabaseQueryResults
} from "./interfaces";

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
} = process.env;

console.info('Creating a Postgres Pool ...');
const pool = new Pool({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    user: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    max: 100,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
console.info('Postgres Pool created.');

export const executeQueryPostgres = async (prop: IgenericDatabaseQueryOptions): Promise<IdatabaseQueryResults> => {
    const client = await pool.connect();
    try {
        const { sql, binds } = postgresBinder(prop.sql, prop.binds);
        const result = await pool.query(sql, binds);
        return {
            rows: result.rows,
            fields: result.fields.map(({name}) => name),
            rowCount: result.rowCount,
            outBinds: result.rows
        };
    } catch (error) {
        console.error(`Error in executeQuery: ${error}`)
        throw new Error(`Error in executeQuery: ${error}`)
    } finally {
        // console.info('fechando conexao')
        client.release();
    }
}
