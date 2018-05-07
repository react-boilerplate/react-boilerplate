const router = require('express').Router();

const { Book } = require('../../db');

router.get('/', async (req, res) => {
  res.json(await Book.find({}));
});

module.exports = router;
