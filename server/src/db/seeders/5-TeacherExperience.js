"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TeacherExperiences",
      [
        {
          name: "1-3 года",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "5-10 лет",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "> 10 лет",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TeacherExperiences", null, {});
  },
};
