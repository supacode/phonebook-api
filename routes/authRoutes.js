const { Router } = require('express');

const authController = require('../controllers/authController');

const router = Router();

router.get('/auth', authController.protectRoutes, authController.isAuth);

router
  .route('/')
  .post(authController.register)
  .get(authController.getUsers);

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
