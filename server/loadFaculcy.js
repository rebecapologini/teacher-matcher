const axios = require('axios');
const { sequelize, University, Faculty } = require('./src/db/models');
require('dotenv').config();

async function loadFaculties() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    // Получите список университетов из базы данных
    const universities = await University.findAll();

    for (const university of universities) {
      let offset = 0;
      const count = 100;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get('https://api.vk.com/method/database.getFaculties', {
          params: {
            access_token: process.env.VK_ACCESS_TOKEN,
            v: '5.131', // Убедитесь, что версия API актуальна
            university_id: university.id,
            count,
            offset,
          },
        });

        if (response.data.error) {
          console.error('Error in VK API response:', response.data.error);
          break;
        }

        const faculties = response.data.response.items;
        if (faculties.length < count) {
          hasMore = false;
        }

        for (const faculty of faculties) {
          await Faculty.upsert({
            id: faculty.id,
            title: faculty.title,
            university_id: university.id, // Свяжите факультеты с университетами
          });
        }

        console.log(`Loaded ${faculties.length} faculties for university ${university.id} with offset ${offset}`);
        offset += count;
      }
    }

    console.log('All faculties data has been loaded successfully.');
  } catch (error) {
    console.error('An error occurred while loading faculties data:', error);
  } finally {
    await sequelize.close();
  }
}

// Функция для получения университетов
async function getUniversities() {
  try {
    const response = await axios.get('https://api.vk.com/method/database.getUniversities', {
      params: {
        access_token: process.env.VK_ACCESS_TOKEN,
        v: '5.131',
        country_id: 1, // Замените на нужный идентификатор страны, если требуется
        count: 1000,
      },
    });

    if (response.data.error) {
      console.error('Error in VK API response:', response.data.error);
      return [];
    }

    if (!response.data.response || !response.data.response.items) {
      console.error('Unexpected response structure:', response.data);
      return [];
    }

    return response.data.response.items;
  } catch (error) {
    console.error('An error occurred while fetching universities:', error);
    return [];
  }
}

loadFaculties();
