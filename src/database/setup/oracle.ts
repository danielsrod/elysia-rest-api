import oracledb, {
    PoolAttributes,
    createPool,
    ExecuteOptions,
    OUT_FORMAT_OBJECT,
    BIND_IN,
    BIND_OUT,
    STRING,
    NUMBER,
    Result,
} from 'oracledb';

import {
    IoracleQueryOptions,
    IgenericDatabaseQueryOptions,
    IdatabaseQueryResults,
} from './interfaces';

import { TanyObject } from './types';

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

const rowsWithLowercaseKeys = (rows: any) => {
    if (rows.length === 0) return [];
    return rows.map((row: any) => {
        const newRow: { [key: string]: any } = {};
        for (const [key, value] of Object.entries(row)) {
            newRow[key.toLowerCase()] = value;
        }
        return newRow;
    });
}

const transformOutBindOracle = (outBind: TanyObject) => {

    const keys = Object.keys(outBind);
    const values = Object.values(outBind);

    if (values.length === 0) return [];

    const transformedData = values[0].map((_: any, index: number) => {
        const transformedObject: TanyObject = {};
        keys.forEach((key) => {
            transformedObject[key] = values[keys.indexOf(key)][index];
        });
        return transformedObject;
    });

    return transformedData;
}

export const executeQueryOracle = async (prop: IgenericDatabaseQueryOptions): Promise<IdatabaseQueryResults> => {
    const pool = await oracledb.getConnection();
    try {
        const { sql, binds } = oracleBinder(prop.sql, prop.binds);
        const result = await pool.execute(sql, binds, executeOptions);
        return {
            rows: rowsWithLowercaseKeys(result.rows),
            fields: result.metaData?.map(({name}) => name.toLowerCase()),
            rowCount: result.rowsAffected ? result.rowsAffected : result.rows?.length,
            outBinds: transformOutBindOracle(result.outBinds ? result.outBinds : [])
        };
    } catch (error) {
        console.error(`Error in executeQuery: ${error}`)
        throw new Error(`Error in executeQuery: ${error}`)
    } finally {
        // console.info('fechando conexao')
        await pool.close();
    }
}