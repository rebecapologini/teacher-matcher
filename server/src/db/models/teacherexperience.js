"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeacherExperience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ StudentProfile }) {
      this.hasMany(StudentProfile, { foreignKey: "teacher_experience_id" });
    }
  }
  TeacherExperience.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TeacherExperience",
    }
  );
  return TeacherExperience;
};
