import { BindParameters } from "oracledb";

// export interface IexecuteQuery {
//     sql: string;
//     binds: BindParameters;
// }

export interface IoracleQueryOptions {
    sql: string;
    binds: BindParameters;
}

export interface IpostgresQueryOptions {
    sql: string;
    binds: any[];
}

export interface IgenericDatabaseQueryOptions {
    sql: string;
    binds: IgenericDatabaseBinds;
}

export interface IgenericDatabaseBinds {
    dir: 'bind_in' | 'bind_out';
    type: 'string' | 'number';
    val: string | number;
}
