const mongoose = require('mongoose');

const bookSchema = require('./book');
const articleSchema = require('./article');
const authorSchema = require('./author');
const userSchema = require('./user');

const mongoDB = 'mongodb://127.0.0.1/richard-bernstein-test';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Book = mongoose.model('Book', bookSchema);
const Article = mongoose.model('Article', articleSchema);
const Author = mongoose.model('Author', authorSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  db,
  Book,
  Article,
  Author,
  User,
};
