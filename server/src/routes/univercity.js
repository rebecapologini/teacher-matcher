// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const router = express.Router();

router.use(cors());
router.use(express.json());

// Пример модели университета (может отличаться в зависимости от вашей реализации)
const {University} = require('../db/models');

// Получение списка университетов из базы данных
router.get('/api/getUniversitiesFromDB', async (req, res) => {
    try {
      // Найти все университеты и отсортировать их по имени
      const universities = await University.findAll({
        order: [
          ['title', 'ASC'],
        ]
      });
      res.json({ universities });
    } catch (error) {
      console.error('An error occurred while fetching universities from DB:', error);
      res.status(500).json({ error: error.message });
    }
  });

// Получение факультетов из API VK по университету



router.get('/api/getFaculties', async (req, res) => {
  const { university_id } = req.query;
  try {
    const response = await axios.get('https://api.vk.com/method/database.getFaculties', {
      params: {
        access_token: process.env.VK_ACCESS_TOKEN,
        v: '5.131',
        university_id,
        count: 100,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
