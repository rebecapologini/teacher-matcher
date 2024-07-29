'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate({User}) {
      Todo.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
