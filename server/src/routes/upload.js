const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

router.use(fileUpload());

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
            console.log('File was uploaded');
    
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
    const fileName = req.body.fileName; 
    
    if (!fileName) {
      return res.status(400).json({ message: "No file specified" });
    }
  
    const filePath = path.join(__dirname, '../public/uploads/', fileName);
  
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.status(200).json({ message: "File deleted" });
    });
  });

module.exports = router;