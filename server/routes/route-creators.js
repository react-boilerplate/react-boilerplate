const createGetAllRoute = (router, Model) => router.get('/', async (req, res) => {
  res.json(await Model.find({}));
});

const createGetOneRoute = (router, Model) => router.get('/:id', async (req, res) => {
  res.json(await Model.find({
    _id: req.params.id,
  }));
});

const createPostRoute = (router, Model) => router.post('/', async (req, res) => {
  const item = await Model.find({
    title: req.body.title,
  });
  if (item.length) res.status(400).json({ ok: 0 });
  else res.status(201).json(await Model.create(req.body));
});

const createPutRoute = (router, Model) => router.put('/:id', async (req, res) => {
  const updated = await Model.update({
    _id: req.params.id,
  }, req.body);
  if (!updated) res.sendStatus(400);
  else res.status(201).json(updated);
});

const createDeleteRoute = (router, Model) => router.delete('/:id', async (req, res) => {
  const deleted = await Model.deleteOne({
    _id: req.params.id,
  });
  if (!deleted.ok) res.sendStatus(400);
  else res.sendStatus(204);
});

const createAllRoutes = (router, Model) => {
  createGetAllRoute(router, Model);
  createGetOneRoute(router, Model);
  createPostRoute(router, Model);
  createPutRoute(router, Model);
  createDeleteRoute(router, Model);
};

module.exports = {
  createGetAllRoute,
  createAllRoutes,
};
