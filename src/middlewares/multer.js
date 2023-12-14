const multer = require('multer');
const path = require('path');

// 파일을 저장할 디스크 스토리지 엔진 설정
const storageEngine = multer.diskStorage({
    destination: (req, file, callback) => {callback(null, path.join(__dirname, '../public/assets/images'));},
    filename: (req, file, callback) => { callback(null, file.originalname); }
})

// 설정한 스토리지 엔진을 사용해 파일 업로드를 처리하는 미들웨어를 생성
const upload = multer({ storage: storageEngine }).single('image');

module.exports = upload;