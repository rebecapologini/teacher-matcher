"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "StudentProfiles",
      [
        {
          language_id: 1,
          goal_id: 2,
          level_id: 3,
          duration: "2 month",
          preferred_sex_id: 1,
          lessons: "3 and more",
          price_id: 2,
          teacher_experience_id: 2,
          about: "Я молодец",
          picture_link: "/asdasd/asd/adsasd",
          sex_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
