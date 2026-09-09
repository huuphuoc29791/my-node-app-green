const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.index);

router.get('/create', productController.createForm);
router.post('/create', productController.store);

router.get('/:id', productController.details);

router.get('/:id/edit', productController.editForm);
router.post('/:id/edit', productController.update);

router.post('/:id/delete', productController.remove);

module.exports = router;
