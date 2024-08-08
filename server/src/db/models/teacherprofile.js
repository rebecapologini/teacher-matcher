"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeacherProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Language, Level, Sex, CometenceArr, Goal, User }) {
      TeacherProfile.hasOne(User, { foreignKey: "teacher_profile_id" });
      TeacherProfile.belongsTo(Language, { foreignKey: "language_id" });
      TeacherProfile.belongsTo(Level, { foreignKey: "languageLevel" });
      TeacherProfile.belongsTo(Sex, { foreignKey: "sex_id" });
      TeacherProfile.belongsToMany(Goal, {
        through: "CometenceArr",
        foreignKey: "profile_id",
      });
    }
  }
  TeacherProfile.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      age: DataTypes.INTEGER,
      sex_id: DataTypes.INTEGER,
      picture_link: DataTypes.STRING,
      competence_arr_id: DataTypes.INTEGER,
      languageLevel: DataTypes.INTEGER,
      documents: DataTypes.STRING,
      language_id: DataTypes.INTEGER,
      teachingExperience: DataTypes.INTEGER,
      almaMater: DataTypes.STRING,
      faculty: DataTypes.STRING,
      academicDegree: DataTypes.STRING,
      lessonCost: DataTypes.INTEGER,
      convenientTime: DataTypes.JSON,
      aboutYourself: DataTypes.STRING,
      videoPresentation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TeacherProfile",
    }
  );
  return TeacherProfile;
};
