import {
    BIND_IN,
    BIND_OUT,
    NUMBER,
    STRING,
} from 'oracledb';

import { 
    IgenericDatabaseBinds,
    IpostgresQueryOptions, 
} from './interfaces';


export const postgresBinder = (_sql: string, _binds: IgenericDatabaseBinds): IpostgresQueryOptions => {
    const entries = Object.entries(_binds);

    let sql = _sql;
    let binds: any = [];

    entries.forEach((key, idx) => {
        if(key[1].dir === 'bind_in') {
            const placeholder = `$${idx + 1}`;
            sql = sql.replace(new RegExp(`:${key[0]}`, 'g'), placeholder)
            binds.push(key[1].value);
        }
    })

    return {
        sql: sql,
        binds: binds
    };
}

export const oracleBinder = (_sql: string, _binds: IgenericDatabaseBinds): object => {
    const entries = Object.entries(_binds);

    let sql = _sql;
    let binds: any = {};
    let bindDir: any;
    let bindType: any;
    let bindValue: any;

    entries.forEach((key, idx) => {
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