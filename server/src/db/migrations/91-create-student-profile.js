"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StudentProfiles", {
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
      phone: {
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
      goal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Goals",
          },
          key: "id",
        },
      },
      level_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Levels",
          },
          key: "id",
        },
      },
      duration: {
        type: Sequelize.STRING,
      },
      preferred_sex_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "PreferredSexes",
          },
          key: "id",
        },
      },
      lessons: {
        type: Sequelize.STRING,
      },
      price_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "StudentPrices",
          },
          key: "id",
        },
      },
      teacher_experience_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "TeacherExperiences",
          },
          key: "id",
        },
      },
      about: {
        type: Sequelize.TEXT,
      },
      picture_link: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("StudentProfiles");
  },
};
