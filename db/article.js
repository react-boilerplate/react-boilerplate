const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  publication: String,
  date: String,
  excerpt: String,
  url: String,
});

module.exports = articleSchema;
