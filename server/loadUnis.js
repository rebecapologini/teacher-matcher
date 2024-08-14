const axios = require('axios');
const { sequelize, University } = require('./src/db/models');
require('dotenv').config();

async function loadCities() {
  let allCities = [];
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    let offset = 0;
    const count = 100; // Максимум 100 городов за один запрос
    let hasMore = true;

    while (hasMore) {
      console.log('VK API request params for cities:', {
        access_token: process.env.VK_ACCESS_TOKEN,
        v: '5.131',
        country_id: 1, // Россия
        count,
        offset,
      });

      const response = await axios.get('https://api.vk.com/method/database.getCities', {
        params: {
          access_token: process.env.VK_ACCESS_TOKEN,
          v: '5.131',
          country_id: 1,
          count,
          offset,
        },
      });

      console.log('VK API response for cities:', response.data);

      if (response.data.error) {
        console.error('Error in VK API response for cities:', response.data.error);
        break;
      }

      if (!response.data.response || !response.data.response.items) {
        console.error('Unexpected response structure for cities:', response.data);
        break;
      }

      const cities = response.data.response.items;
      allCities = allCities.concat(cities);
      if (cities.length < count) {
        hasMore = false;
      }

      offset += count;
    }

    console.log(`Loaded ${allCities.length} cities`);
    return allCities;
  } catch (error) {
    console.error('An error occurred while loading cities data:', error);
    return [];
  }
}

async function loadUniversities(cities) {
  try {
    // Ensure the database connection is open
    await sequelize.authenticate();
    console.log('Database connected!');

    const count = 100; // Максимум 100 университетов за один запрос

    for (const city of cities) {
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        console.log('VK API request params for universities:', {
          access_token: process.env.VK_ACCESS_TOKEN,
          v: '5.131',
          city_id: city.id,
          count,
          offset,
        });

        const response = await axios.get('https://api.vk.com/method/database.getUniversities', {
          params: {
            access_token: process.env.VK_ACCESS_TOKEN,
            v: '5.131',
            city_id: city.id,
            count,
            offset,
          },
        });

        console.log('VK API response for universities:', response.data);

        if (response.data.error) {
          console.error('Error in VK API response for universities:', response.data.error);
          break;
        }

        if (!response.data.response || !response.data.response.items) {
          console.error('Unexpected response structure for universities:', response.data);
          break;
        }

        const universities = response.data.response.items;
        if (universities.length < count) {
          hasMore = false;
        }

        for (const university of universities) {
          await University.upsert({
            id: university.id,
            title: university.title,
            city_id: university.city_id,
            country_id: university.country_id,
          });
        }

        console.log(`Loaded ${universities.length} universities for city ${city.id}`);
        offset += count;
      }
    }

    console.log('All universities data has been loaded successfully.');
  } catch (error) {
    console.error('An error occurred while loading universities data:', error);
  }
}

(async () => {
  try {
    const cities = await loadCities();
    await loadUniversities(cities);
  } finally {
    // Close the database connection after all operations are complete
    await sequelize.close();
  }
})();
