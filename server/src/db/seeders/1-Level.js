"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Levels",
      [
        {
          level: "A1 - Начальный",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "A2 - Элементарный",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "B1 - Средний",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "B2 - Средне-продвинутый",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "C1 - Продвинутый",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "C2 - Владение в совершенстве",
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
