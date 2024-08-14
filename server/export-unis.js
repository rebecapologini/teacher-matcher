const { University } = require('./src/db/models');
const fs = require('fs');

async function exportUniversities() {
  try {
    const universities = await University.findAll();
    const universitiesData = universities.map(uni => uni.toJSON());

    fs.writeFileSync('universities.json', JSON.stringify(universitiesData, null, 2));
    console.log('Universities data has been exported successfully.');
  } catch (error) {
    console.error('An error occurred while exporting universities data:', error);
  }
}

exportUniversities();
