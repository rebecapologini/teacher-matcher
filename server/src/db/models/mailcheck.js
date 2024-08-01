"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MailCheck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "user_id" });
      // define association here
    }
  }
  MailCheck.init(
    {
      user_id: DataTypes.INTEGER,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MailCheck",
    }
  );
  return MailCheck;
};
