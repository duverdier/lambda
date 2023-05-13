import * as Sequelize from 'sequelize';
const { Op } = require('sequelize');

const tableName = 'Structures';

export async function up({ context: sequelize }) {
  const queryInterface = sequelize.getQueryInterface() as Sequelize.QueryInterface;
  return await queryInterface.bulkInsert(
    tableName,
    [
      {
        TypeStructure: 'CONTROLLEUR',
        StructureName: 'Lambda',
        Id_Role: 1,
      },
    ],
    {},
  );
}

export async function down({ context: sequelize }) {
  const queryInterface = sequelize.getQueryInterface() as Sequelize.QueryInterface;
  return await queryInterface.bulkDelete(tableName, {
    [Op.and]: [{ typeStructure: 'CONTROLLEUR', structureName: 'Lambda' }],
  });
}
