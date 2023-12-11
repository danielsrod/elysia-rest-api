import { BindParameters } from "oracledb";

export interface IexecuteQuery {
    sql: string,
    binds: BindParameters,
}