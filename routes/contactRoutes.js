const { Router } = require('express');

const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.protectRoutes);

router
  .route('/')
  .post(contactController.createContact)
  .get(contactController.getAllContacts);

router
  .route('/:id')
  .get(contactController.getOneContact)
  .delete(contactController.deleteContact)
  .patch(contactController.updateContact);

module.exports = router;
