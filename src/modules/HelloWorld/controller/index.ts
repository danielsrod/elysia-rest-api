import * as repository from '../repository/index'

export const helloWorld = async c => {
    const result = await repository.helloWorld();
}