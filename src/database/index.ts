import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(): Promise<Connection> => {
    // aqui vou verificar se é um comando de teste ou se é um comando de ambiente de desenvolvimento

    // vou pegar toda as informações que tenho dentro o ormconfig.json
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        // Se a variável de ambiente é teste então você vai usar um determinado banco de teste se não vc vai usar o banco padrão
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === 'test'
                ? './src/database/database.test.sqlite'
                : defaultOptions.database,
        })
    );   
}
