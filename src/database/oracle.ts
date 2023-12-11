import oracledb, {
    PoolAttributes,
    createPool,
    ExecuteOptions,
    OUT_FORMAT_OBJECT
} from 'oracledb';

import {
    IexecuteQuery
} from './interfaces';

const {
    ORACLE_USER,
    ORACLE_PASSWORD,
    ORACLE_CONNECTIONSTRING
} = process.env;

const options: PoolAttributes = {
    user: ORACLE_USER,
    password: ORACLE_PASSWORD,
    connectionString: ORACLE_CONNECTIONSTRING,
};

const executeOptions: ExecuteOptions = {
    autoCommit: true,
    outFormat: OUT_FORMAT_OBJECT,
}; 

console.info('Creating a Oracle Pool ...');
await createPool(options);
console.info('Oracle Pool created.');

export const executeQuery = async (prop: IexecuteQuery) => {
    const pool = await oracledb.getConnection();
    try {
       const result = await pool.execute(prop.sql, prop.binds, executeOptions);
       return result;
    } catch (error) {
        console.error(`Error in executeQuery: ${error}`)
        throw new Error(`Error in executeQuery: ${error}`)
    } finally {
        console.info('fechando conexao')
        await pool.close();
    }
}