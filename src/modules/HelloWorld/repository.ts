import { handleExecuteQuery } from "../../database/setup/handler";
import { IOracleBinds } from "../../database/setup/types";

export const helloWorld = async () => {
    try {
        const sql = `
            select 'hello world' as ds_text from dual
        `;
        const binds: IOracleBinds = {};
        const result = await handleExecuteQuery({ sql, binds });
        return result;
    } catch (error) {
        console.error(error)
    }
}