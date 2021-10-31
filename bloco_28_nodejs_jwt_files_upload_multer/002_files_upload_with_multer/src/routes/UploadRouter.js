const router = require('express').Router();
const multer = require('multer');

const UploadsController = require('../controllers/UploadController');


const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (_request, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), UploadsController.saveFile);

module.exports = router;
