const { Router } = require('express');

const authController = require('../controllers/authController');

const router = Router();

router.route('/').post(authController.register);

module.exports = router;
