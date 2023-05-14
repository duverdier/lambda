import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as models from '../entity';
import { environmentVariable } from '../config/environment-variable';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: environmentVariable.DB_HOST,
        port: environmentVariable.DB_PORT,
        username: environmentVariable.DB_USERNAME,
        password: environmentVariable.DB_PASSWORD,
        database: environmentVariable.DB_NAME,
        logging: true,
        query: {
          raw: true, // Activer les résultats bruts
          nest: true, // Activer le formatage des résultats en objets imbriqués
        },
      } as SequelizeOptions);
      sequelize.addModels(Object.values(models));
      await sequelize.sync();
      return sequelize;
    },
  },
];
