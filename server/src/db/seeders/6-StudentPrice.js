"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "StudentPrices",
      [
        {
          name: "до 2000",
          key_name: "до2000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "до 5000",
          key_name: "до5000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "до 10000",
          key_name: "до10000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StudentPrices", null, {});
  },
};
