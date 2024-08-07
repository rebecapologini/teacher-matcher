"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "PreferredSexes",
      [
        {
          name: "man",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "woman",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "both",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PreferredSexes", null, {});
  },
};
