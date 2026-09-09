const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const index = async (req, res) => {
	try {
		const products = await Product.getAll();

		res.render('products/index', {
			products
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
};

const details = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.getById(id);

		if (!product) {
			return res.status(404).send('Product not found');
		}

		res.render('products/details', {
			product
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
};

const createForm = async (req, res) => {
	try {
		const categories = await Category.getAll();

		res.render('products/create', {
			categories
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
};

const store = async (req, res) => {
	try {
		const { name, price, stock, category_id } = req.body;

		if (!name || name.trim() === '') {
			return res.status(400).send('Product name is required');
		}

		await Product.create(name, price, stock, category_id);

		res.redirect('/products');
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
};

const editForm = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.getById(id);

		if (!product) {
			return res.status(404).send('Product not found');
		}

		res.render('products/edit', {
			product
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
};

const update = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, price, stock, category_id } = req.body;

		if (!name || name.trim() === '') {
			return res.status(400).send('Product name is required');
		}

		await Product.update(id, name, price, stock, category_id);

		res.redirect('/products');
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
};

const remove = async (req, res) => {
	try {
		const { id } = req.params;

		await Product.remove(id);

		res.redirect('/products');
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
};

module.exports = {
	index,
	details,
	createForm,
	store,
	editForm,
	update,
	remove
};
