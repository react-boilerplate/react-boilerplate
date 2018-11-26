const ItemsModel = require('./model');

const addItem = (item, callback) => {
  const ItemsDB = new ItemsModel();
  ItemsDB.item = item;
  ItemsDB.save(callback);
};

const getAllItems = callback => {
  ItemsModel.find({}).exec(callback);
};

module.exports = {
  addItem,
  getAllItems,
};
