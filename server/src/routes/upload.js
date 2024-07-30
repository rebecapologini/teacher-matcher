const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs')
router.use(fileUpload());

const fileMappings = {};

router.post('/upload', (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.files.file;

        if (!file) return res.status(400).json({ error: 'Incorrect input name' });

        const newFileName = encodeURI(uuidv4() + '-' + file.name);
        const uploadPath = path.join(__dirname, '../public/uploads/', newFileName);

        file.mv(uploadPath, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            
            // Сохраняем соответствие оригинального имени и нового имени
            fileMappings[file.name] = newFileName;

            res.json({
                fileName: file.name,
                filePath: `/uploads/${newFileName}`
            });
        });
    } catch (error) {
        console.error(error)
        res.status(404)
    }
});

router.delete('/upload', (req, res) => {
    const { fileName } = req.body;

    // Получаем новое имя файла
    const newFileName = fileMappings[fileName];

    if (!newFileName) {
      return res.status(400).json({ message: "File not found" });
    }

    const filePath = path.join(__dirname, '../public/uploads/', newFileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error occurred while deleting file:', err);
        return res.status(500).json({ message: 'Error deleting file' });
      }

      // Удаляем запись о файле
      delete fileMappings[fileName];

      res.status(200).json({ message: "File deleted" });
    });
});

module.exports = router;