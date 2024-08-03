const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const {nanoid} = require('nanoid') 
const path = require('path');
const fs = require('fs')
router.use(fileUpload());
let id = nanoid()
const fileMappings = {};

router.post('/upload', (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: "No file uploaded or incorrect input name" });
        }

        const file = req.files.file;

        // Заменяем пробелы на _
        const newFileName = nanoid() + '-' + file.name.replace(/\s+/g, '_');
        const uploadPath = path.join(__dirname, '../public/uploads/', newFileName);

        file.mv(uploadPath, err => {
            if (err) {
                console.error('Error moving file:', err);
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
        console.error('Error in upload route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/upload', (req, res) => {
    const { fileName } = req.body;

    // Заменяем пробелы на _
    const newFileName = fileMappings[fileName.replace(/\s+/g, '_')];

    if (!newFileName) {
        return res.status(400).json({ message: "File not found" });
    }

    const filePath = path.join(__dirname, '../public/uploads/', newFileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error occurred while deleting file:', err);
            return res.status(500).json({ message: 'Error deleting file' });
        }

        delete fileMappings[fileName]; // Удаление записи о файле

        res.status(200).json({ message: "File deleted" });
    });
});

module.exports = router;