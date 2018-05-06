const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  publication: String,
  date: String,
  excerpt: String,
  url: String,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = {
  Article,
};
