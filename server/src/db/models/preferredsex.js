"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PreferredSex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ StudentProfile }) {
      this.hasMany(StudentProfile, { foreignKey: "preferred_sex_id" });
    }
  }
  PreferredSex.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PreferredSex",
    }
  );
  return PreferredSex;
};
