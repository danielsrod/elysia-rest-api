// import { ThandleExecuteQuery } from "./types";
import { executeQueryOracle } from "./oracle";
import { executeQueryPostgres } from "./postgres";
import { getInterfaceByName } from './types'
import { IgenericDatabaseQueryOptions } from "./interfaces";
import { useSgbd } from "./useSgbd";

const getDatabaseInterface = getInterfaceByName(useSgbd);

export const handleExecuteQuery = async (prop: IgenericDatabaseQueryOptions): Promise<typeof getDatabaseInterface> => {
    switch(useSgbd) {
        case 'oracle':
            return await executeQueryOracle(prop);
            break;
        case 'postgres':
            return await executeQueryPostgres(prop);
            break;
        default:
            throw new Error('sgbd must be configured')
            break;
    }
}
