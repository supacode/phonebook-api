const { Router } = require('express');

const authController = require('../controllers/authController');

const router = Router();

router.get('/auth', authController.protectRoutes, authController.isAuth);

router
  .route('/')
  .post(authController.register)
  .get(authController.getUsers);

router.route('/login').post(authController.login);

module.exports = router;
