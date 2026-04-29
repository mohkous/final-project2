const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  details: {
    type: DataTypes.STRING
  },
  subtitle: {
    type: DataTypes.STRING
  }
});

module.exports = Activity;
