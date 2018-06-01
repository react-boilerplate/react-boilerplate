const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  about: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

module.exports = authorSchema;
