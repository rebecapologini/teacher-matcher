"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CometenceArr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CometenceArr.init(
    {
      goal_id: DataTypes.INTEGER,
      profile_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CometenceArr",
    }
  );
  return CometenceArr;
};
