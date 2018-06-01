const router = require('express').Router();
const AWS = require('aws-sdk');

const { Book } = require('../../db');
const {
  createGetAllRoute,
  createGetOneRoute,
  createPostRoute,
  createPutRoute,
} = require('./route-creators');
const { extractNameFromUrl, generateAwsParams } = require('../helpers');

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

const asyncDeleteObject = (data) => new Promise((resolve, reject) => {
  aws.deleteObject(data, (err, result) => {
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

router.post('/image', async (req, res) => {
  if (!req.files) {
    res.sendStatus(400);
  }
  const { file } = req.files;
  // const awsData = {
  //   Body: file.data,
  //   Key: file.name,
  //   Bucket: process.env.BUCKET,
  //   ACL: 'public-read',
  // };
  try {
    await asyncPutObject(generateAwsParams(file.name, process.env.BUCKET, file.data));
    res.json({ ok: 1, url: `https://s3.us-east-2.amazonaws.com/richard-bernstein-books/${file.name}` });
  } catch (err) {
    console.log('Images post error: ', err);
    res.json({ ok: 0 });
  }
});

router.put('/image', async (req, res) => {
  if (!req.files) {
    res.sendStatus(400);
  }
  const { file } = req.files;
  try {
    const book = await Book.findOne({
      _id: req.body._id,
    });
    const { imgSrc } = book;
    const oldImageName = extractNameFromUrl(imgSrc);
    await asyncDeleteObject(generateAwsParams(oldImageName, process.env.BUCKET));
    await asyncPutObject(generateAwsParams(file.name, process.env.BUCKET, file.data));
    res.json({ ok: 1, url: `https://s3.us-east-2.amazonaws.com/richard-bernstein-books/${file.name}` });
  } catch (err) {
    console.log('Images update error: ', err);
    res.json({ ok: 0 });
  }
});

createGetAllRoute(router, Book);
createGetOneRoute(router, Book);
createPostRoute(router, Book);
createPutRoute(router, Book);

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
    });
    const { imgSrc } = book;
    const oldImageName = extractNameFromUrl(imgSrc);
    await asyncDeleteObject(generateAwsParams(oldImageName, process.env.BUCKET));
    const deleted = await Book.deleteOne({
      _id: req.params.id,
    });
    if (!deleted.ok) res.sendStatus(400);
    else res.sendStatus(204);
  } catch (err) {
    console.log('Delete error: ', err);
    res.sendStatus(400);
  }
});

module.exports = router;
