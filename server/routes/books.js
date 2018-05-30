const router = require('express').Router();
const AWS = require('aws-sdk');

const { Book } = require('../../db');
const { createAllRoutes } = require('./route-creators');

const asyncPutObject = (data) => new Promise((resolve, reject) => {
  s3Bucket.putObject(data, (err, result) => {
    if (err) {
      console.log('Error uploading data: ', data);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const s3Bucket = new AWS.S3({
  params: {
    Bucket: 'richard-bernstein-books',
  },
});


createAllRoutes(router, Book);

router.post('/image', async (req, res) => {
  if (!req.files) {
    res.sendStatus(400);
  }
  const { file } = req.files;
  const awsData = {
    Bucket: s3Bucket,
    Body: file,
  };
  const fileUploadResult = await asyncPutObject(awsData);
  console.log(fileUploadResult);
  res.json({ ok: 1 });
});

module.exports = router;
