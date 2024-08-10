"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Levels",
      [
        {
          level: "A1 - Начальный",
          profile_name: "A1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "A2 - Элементарный",
          profile_name: "A2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "B1 - Средний",
          profile_name: "B1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "B2 - Средне-продвинутый",
          profile_name: "B2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "C1 - Продвинутый",
          profile_name: "C1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: "C2 - Владение в совершенстве",
          profile_name: "C2",
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
