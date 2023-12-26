import { executeQueryOracle } from "./index";
import { OracleResult } from './types'
import { IOracleQueryOptions } from "./interfaces";

export const handleExecuteQuery = async (prop: IOracleQueryOptions): Promise<OracleResult> => {
    return await executeQueryOracle(prop);
}
