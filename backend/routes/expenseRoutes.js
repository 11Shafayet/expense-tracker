const express = require('express');
const {
  addExpense,
  getAllExpense,
  updateExpense,
  deleteExpense,
  getSingleExpense,
} = require('../controllers/expenseControllers');

const router = express.Router();

module.exports = function (expenseCollection) {
  router.post('/', addExpense(expenseCollection));
  router.get('/all/:id', getAllExpense(expenseCollection));
  router.get('/:id', getSingleExpense(expenseCollection));
  router.patch('/:id', updateExpense(expenseCollection));
  router.delete('/:id', deleteExpense(expenseCollection));

  return router;
};
