"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ StudentProfile }) {
      this.hasMany(StudentProfile, { foreignKey: "price_id" });
    }
  }
  StudentPrice.init(
    {
      name: DataTypes.STRING,
      key_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StudentPrice",
    }
  );
  return StudentPrice;
};
