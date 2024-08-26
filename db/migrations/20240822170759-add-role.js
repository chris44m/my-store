'use strict';
const { USER_TABLE } = require('./../models/userModel')
const { DataTypes, Sequelize } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer'

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role')
  }
};
