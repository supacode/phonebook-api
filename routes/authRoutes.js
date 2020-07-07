const { Router } = require('express');

const authController = require('../controllers/authController');

const router = Router();

router
  .route('/')
  .post(authController.register)
  .get(authController.getUsers);

router.route('/login').post(authController.login);

module.exports = router;
