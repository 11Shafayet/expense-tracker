const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/userControllers');

const router = express.Router();

module.exports = function (userCollection) {
  router.post('/', registerUser(userCollection));
  router.post('/login', loginUser(userCollection));
  router.get('/:id', getAllUsers(userCollection));
  router.patch('/', updateUserRole(userCollection));
  router.delete('/:id', deleteUser(userCollection));

  return router;
};
