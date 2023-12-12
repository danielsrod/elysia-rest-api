import { Result } from "oracledb"
import { QueryResult } from "pg"

export type ThandleExecuteQuery = Result<unknown> | QueryResult