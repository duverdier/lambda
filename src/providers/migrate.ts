import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import { environmentVariable } from '../config/environment-variable';

const sequelize = new Sequelize({
  host: environmentVariable.DB_HOST,
  port: environmentVariable.DB_PORT,
  username: environmentVariable.DB_USERNAME,
  password: environmentVariable.DB_PASSWORD,
  database: environmentVariable.DB_NAME,
  dialect: 'mssql',
});

const umzug = new Umzug({
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize,
  logger: console,
  migrations: {
    glob: ['../utils/database/seed/*.{ts, js}', { cwd: __dirname }],
  },
});

const task = (process.argv[2] || '').trim();

switch (task) {
  case 'up':
    umzug.up().then((result) => {
      console.log('Migrations up went successful!', result);
      process.exit(0);
    });
    break;
  case 'down':
    umzug.down().then((result) => {
      console.log('Migrations down went successful!', result);
      process.exit(0);
    });
    break;
  default:
    break;
}
