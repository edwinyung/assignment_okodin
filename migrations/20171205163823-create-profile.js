'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aboutme: {
        type: Sequelize.STRING
      },
      talents: {
        type: Sequelize.STRING
      },
      favorites: {
        type: Sequelize.STRING
      },
      whymessage: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      martial: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.STRING
      },
      children: {
        type: Sequelize.INTEGER
      },
      occupation: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      userId: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Profiles');
  }
};
