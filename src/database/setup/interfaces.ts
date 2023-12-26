import { BindParameters } from "oracledb";

export interface IOracleQueryOptions {
    sql: string;
    binds: BindParameters;
}
