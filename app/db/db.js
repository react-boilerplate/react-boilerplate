const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/dovenmuehle';

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true },
);

const db = mongoose.connection;

db.once('open', console.log.bind(console, 'MongoDB connection successful!')).on(
  'error',
  console.error.bind(console, 'MongoDB connection error:'),
);

module.exports = mongoose;
