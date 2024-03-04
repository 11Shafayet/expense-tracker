const express = require('express');
const {
  addCategory,
  getAllCategory,
} = require('../controllers/categoryControllers');

const router = express.Router();

module.exports = function (categoryCollection) {
  router.post('/', addCategory(categoryCollection));
  router.get('/:id', getAllCategory(categoryCollection));

  return router;
};
