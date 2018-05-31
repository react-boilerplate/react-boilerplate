const router = require('express').Router();
const AWS = require('aws-sdk');

const { Book } = require('../../db');
const { createAllRoutes } = require('./route-creators');

const asyncPutObject = (data) => new Promise((resolve, reject) => {
  aws.putObject(data, (err, result) => {
    if (err) {
      console.log('Error uploading data: ', data);
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const aws = new AWS.S3({
  signatureVersion: 'v4',
});


createAllRoutes(router, Book);

router.post('/image', async (req, res) => {
  if (!req.files) {
    res.sendStatus(400);
  }
  const { file } = req.files;
  const awsData = {
    Body: file.data,
    Key: file.name,
    Bucket: process.env.BUCKET,
    ACL: 'public-read',
  };
  try {
    await asyncPutObject(awsData);
    res.json({ ok: 1, url: `https://s3.us-east-2.amazonaws.com/richard-bernstein-books/${file.name}` });
  } catch (err) {
    res.json({ ok: 0 });
    console.log('Images post error: ', err);
  }
});

module.exports = router;
