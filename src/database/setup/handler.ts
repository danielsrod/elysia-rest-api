import { ThandleExecuteQuery } from "./types";

import { executeQueryOracle } from "./oracle";

import { IgenericDatabaseQueryOptions } from "./interfaces";

// TODO: create a validatoin to use the correct database USE_DATABASE: 'oracle' | 'postgres' | 'mysql' | ...
const { USE_SGBD } = process.env;

export const handleExecuteQuery = async (prop: IgenericDatabaseQueryOptions): Promise<ThandleExecuteQuery> => {
    if (USE_SGBD === 'oracle') {
        return await executeQueryOracle(prop);
    } else if (USE_SGBD === 'postgres') {
        return await executeQueryOracle(prop); // TODO: pg
    } else {
        throw new Error('sgbd must be configured')
    }
}
