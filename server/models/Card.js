const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  validUntil: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Active'
  },
  qrCode: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Relationships
User.hasMany(Card);
Card.belongsTo(User);

module.exports = Card;
