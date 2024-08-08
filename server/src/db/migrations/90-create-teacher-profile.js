"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TeacherProfiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      surname: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      sex_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Sexes",
          },
          key: "id",
        },
      },
      picture_link: {
        type: Sequelize.STRING,
      },
      competence_arr_id: {
        type: Sequelize.INTEGER,
      },
      languageLevel: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Levels",
          },
          key: "id",
        },
      },
      documents: {
        type: Sequelize.STRING,
      },
      language_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Languages",
          },
          key: "id",
        },
      },
      teachingExperience: {
        type: Sequelize.INTEGER,
      },
      almaMater: {
        type: Sequelize.STRING,
      },
      faculty: {
        type: Sequelize.STRING,
      },
      academicDegree: {
        type: Sequelize.STRING,
      },
      lessonCost: {
        type: Sequelize.INTEGER,
      },
      convenientTime: {
        type: Sequelize.JSON,
      },
      aboutYourself: {
        type: Sequelize.STRING,
      },
      videoPresentation: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("TeacherProfiles");
  },
};
