import { BindParameters, Result } from 'oracledb';

export type OracleResult = Result<unknown>;

export type IOracleBinds = BindParameters;
