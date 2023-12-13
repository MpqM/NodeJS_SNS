const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
    destination: (req, file, callback) => {callback(null, path.join(__dirname, '../public/assets/images'));},
    filename: (req, file, callback) => { callback(null, file.originalname); }
})

const upload = multer({ storage: storageEngine }).single('image');

module.exports = upload;