const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get('/', studentController.index);

router.get('/create', studentController.createForm);
router.post('/create', studentController.store);

router.get('/:id', studentController.details);

router.get('/:id/edit', studentController.editForm);
router.post('/:id/edit', studentController.update);

router.post('/:id/delete', studentController.remove);

module.exports = router;
