const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const { nanoid } = require('nanoid');
const path = require('path');
const fs = require('fs');

router.use(fileUpload());
const fileMappings = {};

router.post('/upload', (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: "Файл не загружен или неправильное имя входного файла" });
        }

        const file = req.files.file;
        const fileType = file.mimetype;

        // Определяем папку для сохранения в зависимости от типа файла
        let folder = '';
        if (fileType === 'application/pdf') {
            folder = 'pdfuploads';
        } else if (fileType.startsWith('image/')) {
            folder = 'uploads';
        } else {
            return res.status(400).json({ message: "Недопустимый тип файла" });
        }

        // Заменяем пробелы на _
        const newFileName = nanoid() + '-' + file.name.replace(/\s+/g, '_');
        const uploadPath = path.join(__dirname, `../public/${folder}/`, newFileName);

        file.mv(uploadPath, err => {
            if (err) {
                console.error('Ошибка при перемещении файла:', err);
                return res.status(500).send(err);
            }

            // Сохраняем соответствие оригинального имени и нового имени
            fileMappings[file.name] = newFileName;

            res.json({
                fileName: file.name,
                filePath: `/${folder}/${newFileName}`
            });
        });
    } catch (error) {
        console.error('Ошибка в маршруте загрузки:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.delete('/upload', (req, res) => {
    const { fileName } = req.body;

    // Заменяем пробелы на _
    const newFileName = fileMappings[fileName.replace(/\s+/g, '_')];

    if (!newFileName) {
        return res.status(400).json({ message: "Файл не найден" });
    }

    // Определяем папку для удаления в зависимости от типа файла
    let folder = '';
    if (newFileName.endsWith('.pdf')) {
        folder = 'pdfuploads';
    } else {
        folder = 'uploads';
    }

    const filePath = path.join(__dirname, `../public/${folder}/`, newFileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Ошибка при удалении файла:', err);
            return res.status(500).json({ message: 'Ошибка при удалении файла' });
        }

        delete fileMappings[fileName]; // Удаление записи о файле

        res.status(200).json({ message: "Файл удален" });
    });
});

module.exports = router;
