'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sigla: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [4, 4],
            msg: 'A sigla precisa ter 4 caracteres',
          }
        }
      },
      nome: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [5, 40],
            msg: 'O nome precisa ter entre 5 e 40 caracteres',
          }
        }
      },
      descricao: {
        type: Sequelize.STRING
      },
      areaId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cursos');
  }
};