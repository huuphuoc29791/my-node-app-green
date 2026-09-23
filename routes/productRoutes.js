const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const { requireLogin, requireRoles } = require('../middlewares/authMiddleware');

router.use(requireLogin);

router.get('/', productController.index);

router.get('/:id', productController.show);

router.post('/', requireRoles('admin'), productController.create);

router.put('/:id', requireRoles('admin'), productController.update);

router.delete('/:id', requireRoles('admin'), productController.remove);

module.exports = router;
