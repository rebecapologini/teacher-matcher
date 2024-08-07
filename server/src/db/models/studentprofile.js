"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StudentProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Language,
      Level,
      Goal,
      PreferredSex,
      StudentPrice,
      Sex,
      TeacherExperience,
      User,
    }) {
      StudentProfile.hasOne(User);
      StudentProfile.belongsTo(Language, { foreignKey: "language_id" });
      StudentProfile.belongsTo(Level, { foreignKey: "level_id" });
      StudentProfile.belongsTo(Goal, { foreignKey: "goal_id" });
      StudentProfile.belongsTo(PreferredSex, {
        foreignKey: "preferred_sex_id",
      });
      StudentProfile.belongsTo(StudentPrice, { foreignKey: "price_id" });
      StudentProfile.belongsTo(Sex, { foreignKey: "sex_id" });
      StudentProfile.belongsTo(TeacherExperience, {
        foreignKey: "teacher_experience_id",
      });
    }
  }
  StudentProfile.init(
    {
      language_id: DataTypes.NUMBER,
      goal_id: DataTypes.NUMBER,
      level_id: DataTypes.NUMBER,
      duration: DataTypes.STRING,
      preferred_sex_id: DataTypes.NUMBER,
      number_of_lessons: DataTypes.STRING,
      price_id: DataTypes.NUMBER,
      teacher_experience_id: DataTypes.NUMBER,
      about: DataTypes.TEXT,
      picture_link: DataTypes.STRING,
      sex_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "StudentProfile",
    }
  );
  return StudentProfile;
};