const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const { createProductValidator } = require('../validators/productValidator');

const { requireLogin, requireRoles } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

router.get('/', productController.index);

router.get('/search', productController.search);

router.get('/:id', productController.show);

router.post(
	'/',
	requireLogin,
	requireRoles('admin'),
	upload.single('image'),
	createProductValidator,
	validate,
	productController.create
);

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
