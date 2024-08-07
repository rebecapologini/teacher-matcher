"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Sexes",
      [
        {
          name: "Мужской",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Женский",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sexes", null, {});
  },
};
