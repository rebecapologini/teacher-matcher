"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Matched_profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "TeacherProfiles",
          key: "id",
        },
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "StudentProfiles",
          key: "id",
        },
      },
      accepted: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Matched_profiles");
  },
};
