import { ThandleExecuteQuery } from "./types";

import { executeQueryOracle } from "./oracle";
import { executeQueryPostgres } from "./postgres";

import { IgenericDatabaseQueryOptions } from "./interfaces";

const { USE_SGBD } = process.env;

export const handleExecuteQuery = async (prop: IgenericDatabaseQueryOptions): Promise<ThandleExecuteQuery> => {
    if (USE_SGBD === 'oracle') {
        return await executeQueryOracle(prop);
    } else if (USE_SGBD === 'postgres') {
        return await executeQueryPostgres(prop);
    } else {
        throw new Error('sgbd must be configured')
    }
}
