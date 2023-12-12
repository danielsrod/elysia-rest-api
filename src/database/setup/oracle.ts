import oracledb, {
    PoolAttributes,
    createPool,
    ExecuteOptions,
    OUT_FORMAT_OBJECT,
    BIND_IN,
    BIND_OUT,
    STRING,
    NUMBER,
} from 'oracledb';

import {
    IoracleQueryOptions,
    IgenericDatabaseQueryOptions,
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

const oracleBinder = (_sql: string, _binds: object): IoracleQueryOptions => {
    const entries = Object.entries(_binds);

    let sql = _sql;
    let binds: any = {};
    let bindDir: any;
    let bindType: any;
    let bindValue: any;

    entries.forEach(key => {
        if(key[1].dir === 'bind_in') {
            const field: string = key[0];
            // dir:
            switch(key[1].dir) {
                case 'bind_in':
                    bindDir = BIND_IN
                    break;
                case 'bind_out':
                    bindDir = BIND_OUT
                    break;
                default:
                    bindDir = BIND_IN
                    break;
            }
            // type:
            switch(key[1].type) {
                case 'string':
                    bindType = STRING
                    break;
                case 'number':
                    bindType = NUMBER
                    break;
            }
            // value:
            switch(key[1].type) {
                case 'string':
                    bindValue = String(key[1].value)
                    break;
                case 'number':
                    bindValue = Number(key[1].value)
                    break;
            }
            binds[field] = {
                dir: bindDir,
                type: bindType,
                value: bindValue
            }
        }
    })

    return {
        sql: sql,
        binds: binds
    };
}

export const executeQueryOracle = async (prop: IgenericDatabaseQueryOptions) => {
    const pool = await oracledb.getConnection();
    try {
        const { sql, binds } = oracleBinder(prop.sql, prop.binds);
        const result = await pool.execute(sql, binds, executeOptions);
        return result;
    } catch (error) {
        console.error(`Error in executeQuery: ${error}`)
        throw new Error(`Error in executeQuery: ${error}`)
    } finally {
        // console.info('fechando conexao')
        await pool.close();
    }
}