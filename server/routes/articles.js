const router = require('express').Router();

const { Article } = require('../../db');

router.get('/', async (req, res) => {
  res.json(await Article.find({}));
});

module.exports = router;
