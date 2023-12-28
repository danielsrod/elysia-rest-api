import { executeQueryPostgres } from './index';
import { IPostgresQueryOptions } from './interfaces';
import { TPostgresResult } from './types';

export const handleExecuteQuery = async (prop: IPostgresQueryOptions): Promise<TPostgresResult> => {
	return await executeQueryPostgres(prop);
};
