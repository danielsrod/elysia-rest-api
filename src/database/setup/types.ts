import { Result as OracleResult } from "oracledb";
import { QueryResult as PostgresResult } from "pg";

type InterfaceMap = {
    oracle: OracleResult<unknown>,
    postgres: PostgresResult
};

type AllProperties<T> = {
    [K in keyof T]: T[K]
}

export const getInterfaceByName = <T extends keyof InterfaceMap>(_: T): AllProperties<InterfaceMap[T]> => {
    return {} as AllProperties<InterfaceMap[T]>;
}
