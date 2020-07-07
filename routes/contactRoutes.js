const { Router } = require('express');

const contactController = require('../controllers/contactController');

const router = Router();

router
  .route('/')
  .post(contactController.createContact)
  .get(contactController.getAllContacts);

router.route('/:id').get(contactController.getOneContact);

module.exports = router;
