const ItemsDB = require('./model');

const addItem = (item, callback) => {
  ItemsDB.items.push(item);
  ItemsDB.save(callback);
};

module.exports = {
  addItem,
};
