const mongoose = require('./db');

const { Schema } = mongoose;

const ItemsModelSchema = new Schema({
  item: String,
});

const ItemsModel = mongoose.model('ItemsModel', ItemsModelSchema);

module.exports = ItemsModel;
