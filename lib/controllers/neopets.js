const { Router } = require('express');
const Neopet = require('../models/Neopet');

module.exports = Router()
  .post('/', async (req, res) => {
    const neopet = await Neopet.insert(req.body);
    res.send(neopet);
  })

  .get('/', async (req, res) => {
    const neopets = await Neopet.findAll();
    res.send(neopets);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const neopet = await Neopet.findById(req.params.id);
      res.send(neopet);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const neopet = await Neopet.updateById(req.params.id, req.body);
    res.send(neopet);
  })

  .delete('/:id', async (req, res) => {
    const neopet = await Neopet.deleteById(req.params.id);
    res.send(neopet);
  });
