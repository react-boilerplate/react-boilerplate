const ItemsModel = require('./model');

const addItem = (item, callback) => {
  const ItemsDB = new ItemsModel();
  ItemsDB.item = item;
  ItemsDB.save(callback);
};

module.exports = {
  addItem,
};
