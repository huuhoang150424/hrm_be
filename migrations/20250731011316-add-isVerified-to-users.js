'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // mặc định user chưa xác thực
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'isVerified');
  }
};
