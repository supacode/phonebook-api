const { Router } = require('express');

const contactController = require('../controllers/contactController');

const router = Router();

router.route('/').post(contactController.createContact);

module.exports = router;
