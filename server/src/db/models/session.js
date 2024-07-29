'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Session.init(
      {
        sid: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        sess: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        expire: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Session',
      }
  );
  return Session;
};
