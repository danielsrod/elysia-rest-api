import { executeQueryOracle } from './index';
import { IOracleQueryOptions } from './interfaces';
import { OracleResult } from './types';

export const handleExecuteQuery = async (prop: IOracleQueryOptions): Promise<OracleResult> => {
	return await executeQueryOracle(prop);
};
