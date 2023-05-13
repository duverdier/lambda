import * as Sequelize from 'sequelize';
const { Op } = require('sequelize');
import * as dotenv from 'dotenv';
dotenv.config();

const tableName = 'Point_focaux';

export async function up({ context: sequelize }) {
  const queryInterface = sequelize.getQueryInterface() as Sequelize.QueryInterface;
  return await queryInterface.bulkInsert(
    tableName,
    [
      {
        Nom: 'Lambda Service',
        Numero: '0709797390',
        password: '$2a$10$yUnpTpnVYmb7HzjLwq5p6eaBkK7pKH4K8CzyZxUdWo71e6rWqVsxy',
        email: 'service@lambda.com',
        Id_Structure: 1,
      },
    ],
    {},
  );
}

export async function down({ context: sequelize }) {
  const queryInterface = sequelize.getQueryInterface() as Sequelize.QueryInterface;
  return await queryInterface.bulkDelete(tableName, {
    [Op.and]: [{ email: 'service@lambda.com' }],
  });
}
