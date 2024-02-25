let multer = require('multer')
require('dotenv').config()

//...........
const imageUploadPath = process.env.IMAGE_UPLOAD_PATH;

//........
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageUploadPath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

module.exports.imageUpload = multer({ storage: storage })

