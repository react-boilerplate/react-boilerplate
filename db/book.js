const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  imgSrc: { type: String, required: true },
  isbn: Number,
  description: String,
  publisher: String,
  publisherUrl: String,
  praise: [
    { quote: String, quoteBy: String },
  ],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = {
  Book,
};
