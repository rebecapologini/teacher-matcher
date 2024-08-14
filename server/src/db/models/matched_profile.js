"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Matched_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Matched_profile.init(
    {
      teacher_id: DataTypes.INTEGER,
      student_id: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Matched_profile",
    }
  );
  return Matched_profile;
};
