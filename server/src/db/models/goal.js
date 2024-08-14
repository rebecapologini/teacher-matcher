"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ StudentProfile, TeacherProfile }) {
      this.hasMany(StudentProfile, { foreignKey: "goal_id" });
      this.belongsToMany(TeacherProfile, {
        through: "CometenceArr",
        foreignKey: "goal_id",
      });
    }
  }
  Goal.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Goal",
    }
  );
  return Goal;
};
