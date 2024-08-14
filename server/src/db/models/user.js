// models/user.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Todo, MailCheck, StudentProfile, TeacherProfile }) {
      User.hasOne(MailCheck, { foreignKey: "user_id" });
      User.belongsTo(StudentProfile, { foreignKey: "student_profile_id" });
      User.belongsTo(TeacherProfile, { foreignKey: "teacher_profile_id" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      student_profile_id: DataTypes.NUMBER,
      teacher_profile_id: DataTypes.NUMBER,
      confirm: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
