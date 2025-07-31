'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn('users', 'otpCode', {
      type: DataTypes.STRING(6),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'otpExpires', {
      type: DataTypes.DATE,
      allowNull: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'otpCode');
    await queryInterface.removeColumn('users', 'otpExpires');
  }
};
