const mongoose = require('./db');

const { Schema } = mongoose;

const ItemsModelSchema = new Schema({
  items: [String],
});

const ItemsModel = mongoose.model('ItemsModel', ItemsModelSchema);

const ItemsDB = new ItemsModel();

module.exports = ItemsDB;
