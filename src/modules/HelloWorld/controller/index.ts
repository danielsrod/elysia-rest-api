import * as repository from '../repository/index'
import { ThelloWorldConfig } from '../routes/routesConfig'

export const helloWorld = async (c: ThelloWorldConfig) => {
    try {
        const result = await repository.helloWorld();
        return {
            status: true,
            message: 'Success in helloWorld',
            data: result
        }
    } catch (error) {
        return {
            status: false,
            message: `error in helloWorld: ${error}`,
            data: null
        }
    }
}