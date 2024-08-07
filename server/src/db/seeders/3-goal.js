"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const goals = [
      "ЕГЭ",
      "ГИА",
      "IELTS",
      "TOFEL",
      "CPE",
      "CAE",
      "FCE",
      "PET",
      "KET",
      "Медицинский английский",
      "Бизнес-английский",
      "Авиационный английский",
      "Общий английский",
      "Английский для путешествий",
      "Повышение успеваемости в школе/университете",
    ].map((goal) => {
      return { name: goal, createdAt: new Date(), updatedAt: new Date() };
    });

    await queryInterface.bulkInsert("Goals", goals, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Goals", null, {});
  },
};
