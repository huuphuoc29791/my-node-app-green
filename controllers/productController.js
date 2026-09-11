const Product = require('../models/productModel');

// GET /api/products
const index = async (req, res) => {
	try {
		const products = await Product.getAll();

		res.status(200).json({
			data: products,
			message: 'Get product list successfully'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Internal server error'
		});
	}
};

// GET /api/products/:id
const show = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.getById(id);

		if (!product) {
			return res.status(404).json({
				message: 'Product not found'
			});
		}

		res.status(200).json({
			data: product,
			message: 'Get product details successfully'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Internal server error'
		});
	}
};

// POST /api/products
const create = async (req, res) => {
	try {
		const { name, price, stock, category_id } = req.body;

		if (!name || name.trim() === '') {
			return res.status(400).json({
				message: 'Product name is required'
			});
		}

		const result = await Product.create(name, price, stock, category_id);

		const product = await Product.getById(result.insertId);

		res.status(201).json({
			data: product,
			message: 'Product created successfully'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Internal server error'
		});
	}
};

// PUT /api/products/:id
const update = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, price, stock, category_id } = req.body;

		if (!name || name.trim() === '') {
			return res.status(400).send('Product name is required');
		}

		await Product.update(id, name, price, stock, category_id);

		const updatedProduct = await Product.getById(id);

		res.status(200).json({
			data: updatedProduct,
			message: 'Product updated successfully'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Internal server error'
		});
	}
};

// DELETE /api/products/:id
const remove = async (req, res) => {
	try {
		const { id } = req.params;

		await Product.remove(id);

		res.status(200).json({
			message: 'Product deleted successfully'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Internal server error'
		});
	}
};

module.exports = {
	index,
	show,
	create,
	update,
	remove
};

// RESTful API

// GET      /products        : Lấy danh sách sản phẩm
// GET      /products/:id    : Lấy chi tiết 1 sản phẩm theo id
// POST     /products        : Thêm sản phẩm mới
// PUT      /products/:id    : Sửa thông tin sản phẩm
// DELETE   /products/:id    : Xóa sản phẩm
