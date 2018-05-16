'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_services', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      service_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'services',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'beginTime',
        defaultValue: Sequelize.literal('NOW()')
      }
    }, {
        timestamps: true,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_services');
  }
}