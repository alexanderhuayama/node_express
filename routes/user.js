'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router
  .get('/users', controller.getAll)
  .get('/user/:id', controller.getById)
  .post('/save/user', controller.save)
  .put('/update/user/:id', controller.update)
  .delete('/delete/user/:id', controller.delete);

module.exports = router;
