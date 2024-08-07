// models/user.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Todo, MailCheck, StudentProfile }) {
      User.hasOne(MailCheck, { foreignKey: "user_id" });
      User.belongsTo(StudentProfile, { foreignKey: "profile_id" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile_id: DataTypes.NUMBER,
      confirm: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
