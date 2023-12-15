import { BindParameters, Result as OracleResult } from "oracledb";
import { QueryResult as PostgresResult } from "pg";

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
    dir?: 'bind_in' | 'bind_out';
    type?: 'string' | 'number';
    val?: string | number;
}

export interface IdatabaseInterfaceMap {
    oracle: OracleResult<unknown>;
    postgres: PostgresResult;
};
