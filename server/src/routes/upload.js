const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { nanoid } = require('nanoid'); // Импортируем nanoid
const { TeacherProfile, StudentProfile } = require("../db/models");
router.use(fileUpload());
const fileMappings = {};

router.post('/upload', async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: "Файл не загружен или неправильное имя входного файла" });
        }

        const file = req.files.file;
        const fileType = file.mimetype;

        let folder = '';
        if (fileType === 'application/pdf') {
            folder = 'pdfuploads';
        } else if (fileType.startsWith('image/')) {
            folder = 'uploads';
        } else {
            return res.status(400).json({ message: "Недопустимый тип файла" });
        }

        // Генерируем уникальный идентификатор
        const uniquePrefix = nanoid();
        const newFileName = `${uniquePrefix}_${file.name.replace(/\s+/g, '_')}`;
        const uploadPath = path.join(__dirname, `../public/${folder}/`, newFileName);
        
        file.mv(uploadPath, async err => {
            if (err) {
                console.error('Ошибка при перемещении файла:', err);
                return res.status(500).send(err);
            }

            try {
                // Обновляем TeacherProfile
                const teacherProfile = await TeacherProfile.findByPk(1);
                if (teacherProfile) {
                    teacherProfile.picture_link = `/${folder}/${newFileName}`;
                    await teacherProfile.save();
                }
                
                // Обновляем StudentProfile
                const studentProfile = await StudentProfile.findByPk(3); // Здесь предполагается, что вы обновляете профиль с ID 1. Убедитесь, что используете правильный идентификатор
                if (studentProfile) {
                    studentProfile.picture_link = `/${folder}/${newFileName}`;
                    await studentProfile.save();
                }
                
                fileMappings[file.name] = newFileName;
                res.json({
                    fileName: file.name,
                    filePath: `/${folder}/${newFileName}`
                });
            } catch (error) {
                console.error('Ошибка при обновлении профилей:', error);
                res.status(500).json({ message: 'Ошибка при обновлении профилей' });
            }
        });
    } catch (error) {
        console.error('Ошибка в маршруте загрузки:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});


router.delete('/upload', (req, res) => {
    const { fileName } = req.body;
    console.log("Удаление файла:", fileName);
    
    // Найдите новое имя файла по оригинальному имени
    const newFileName = fileMappings[fileName];
    if (!newFileName) {
        return res.status(400).json({ message: "Файл не найден в системе" });
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

        // Удаляем запись о файле
        delete fileMappings[fileName];
        res.status(200).json({ message: "Файл удален" });
    });
});

module.exports = router;
