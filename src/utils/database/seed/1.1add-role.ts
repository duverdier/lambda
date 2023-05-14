import * as Sequelize from 'sequelize';
const { Op } = require('sequelize');

const tableName = 'Roles';

export async function up({ context: sequelize }) {
  const queryInterface = sequelize.getQueryInterface() as Sequelize.QueryInterface;
  const migration = await queryInterface.bulkInsert(
    tableName,
    [
      {
        Roles: 'ROOT',
      },
    ],
    {},
  );
  console.log('migration: ', migration);
  return migration;
}

export async function down({ context: sequelize }) {
  const queryInterface = sequelize.getQueryInterface() as Sequelize.QueryInterface;
  return await queryInterface.bulkDelete(tableName, {
    [Op.and]: [{ Roles: 'ROOT' }],
  });
}
