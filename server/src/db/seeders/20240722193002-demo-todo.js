'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
        `SELECT id from "Users";`
    );

    const userRows = users[0];

    await queryInterface.bulkInsert('Todos', [
      {
        title: 'Buy groceries',
        completed: false,
        userId: userRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Read a book',
        completed: false,
        userId: userRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Write blog post',
        completed: false,
        userId: userRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Exercise',
        completed: false,
        userId: userRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cook dinner',
        completed: false,
        userId: userRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
