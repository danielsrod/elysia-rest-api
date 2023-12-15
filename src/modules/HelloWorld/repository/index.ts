import { handleExecuteQuery } from "../../../database/setup/handler";
import { IgenericDatabaseBinds } from "../../../database/setup/interfaces";

export const helloWorld = async () => {
    try {
        const sql = `
            select 'hello world' as ds_text from dual
        `;
        const binds: IgenericDatabaseBinds = {};
        const result = await handleExecuteQuery({ sql, binds });
    } catch (error) {
        console.error(error)
    }
}