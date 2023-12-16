// import { ThandleExecuteQuery } from "./types";
import { executeQueryOracle } from "./oracle";
import { executeQueryPostgres } from "./postgres";
// import { getInterfaceByName } from './types'
import { IgenericDatabaseQueryOptions, IdatabaseQueryResults } from "./interfaces";
import { useSgbd } from "./useSgbd";

// const getDatabaseInterface = getInterfaceByName(useSgbd);

export const handleExecuteQuery = async (prop: IgenericDatabaseQueryOptions): Promise<IdatabaseQueryResults> => {
    switch(useSgbd) {
        case 'oracle':
            return await executeQueryOracle(prop);
        case 'postgres':
            return await executeQueryPostgres(prop);
        default:
            throw new Error('sgbd must be configured')
    }
}
