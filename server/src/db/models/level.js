"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Level, StudentProfile }) {
      Level.hasMany(StudentProfile, { foreignKey: "level_id" });
    }
  }
  Level.init(
    {
      level: DataTypes.STRING,
      profile_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Level",
    }
  );
  return Level;
};
