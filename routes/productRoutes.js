const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const { requireLogin, requireRoles } = require('../middlewares/authMiddleware');

router.get('/', productController.index);

router.get('/:id', productController.show);

router.post('/', requireLogin, requireRoles('admin'), productController.create);

router.put(
	'/:id',
	requireLogin,
	requireRoles('admin'),
	productController.update
);

router.delete(
	'/:id',
	requireLogin,
	requireRoles('admin'),
	productController.remove
);

module.exports = router;
