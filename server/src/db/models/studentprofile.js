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
      TeacherProfile,
    }) {
      StudentProfile.hasOne(User, { foreignKey: "student_profile_id" });
      StudentProfile.belongsToMany(TeacherProfile, {
        through: "Matched_profile",
        as: "matched",
        foreignKey: "student_id",
      });
      StudentProfile.belongsToMany(TeacherProfile, {
        through: "Disliked_profile",
        as: "disliked",
        foreignKey: "student_id",
      });
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
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      age: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      language_id: DataTypes.INTEGER,
      goal_id: DataTypes.INTEGER,
      level_id: DataTypes.INTEGER,
      duration: DataTypes.STRING,
      preferred_sex_id: DataTypes.INTEGER,
      lessons: DataTypes.STRING,
      price_id: DataTypes.INTEGER,
      teacher_experience_id: DataTypes.INTEGER,
      about: DataTypes.TEXT,
      picture_link: DataTypes.STRING,
      sex_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "StudentProfile",
    }
  );
  return StudentProfile;
};
