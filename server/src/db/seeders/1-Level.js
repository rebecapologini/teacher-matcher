"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Levels",
      [
        {
          level: "A1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "A2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "B1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "B2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "C1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "C2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Levels", null, {});
  },
};
