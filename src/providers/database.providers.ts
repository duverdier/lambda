import { Sequelize } from 'sequelize-typescript';
import * as process from 'process';
import { Structure } from '../entity/structure.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: true,
      });
      sequelize.addModels([Structure]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
