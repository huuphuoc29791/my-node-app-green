const express = require('express');
const app = express();
const products = require('./data/products');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
	res.render('products/productList', {
		products
	});
});

app.get('/products/create', (req, res) => {
	res.render('products/productCreate');
});

app.post('/products/create', (req, res) => {
	const { id, name, price, description } = req.body;
	products.push({
		id: Number(id),
		name,
		price: Number(price),
		description
	});
	res.redirect('/products');
});

app.listen(8000, () => {
	console.log(`Server is running at http://localhost:8000`);
});
