'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const universitiesData = JSON.parse(fs.readFileSync('universities.json', 'utf8'));
    
    // Добавляем createdAt и updatedAt поля
    const dataWithTimestamps = universitiesData.map(university => ({
      ...university,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Universities', dataWithTimestamps, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Universities', null, {});
  }
};
