const router = require('express').Router();
// const multer = require('multer');
// const AWS = require('aws-sdk');

const { Book } = require('../../db');
const { createAllRoutes } = require('./route-creators');

// const asyncPutObject = (data) => new Promise((resolve, reject) => {
//   s3Bucket.putObject(data, (err, result) => {
//     if (err) {
//       console.log('Error uploading data: ', data);
//       reject(err);
//     } else {
//       resolve(result);
//     }
//   });
// });

// const s3Bucket = new AWS.S3({
//   params: {
//     Bucket: 'richard-bernstein-books',
//   },
// });

// const storage = multer.diskStorage({
//   destination: './files',
//   filename(req, file, cb) {
//     cb(null, `${new Date()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

createAllRoutes(router, Book);

// router.post('/image', upload.single('file'), async (req, res) => {
//   const { file, body } = req;
//   const { name } = body;
//   console.log(body)
//   const data = {
//     Key: name,
//     Body: file,
//   };

  // const result = await asyncPutObject(data);
// });

module.exports = router;
