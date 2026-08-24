const express = require('express');
const app = express();
const { getAllProducts } = require('./products');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home', { name: 'Ricky', age: 30, hour: 10 });
});

app.get('/products', (req, res) => {
	res.render('products', { products: getAllProducts() });
});

app.get('/abc', (req, res) => {
	res.redirect('http://www.google.com');
});

app.listen(8000, () => {
	console.log(`Server is running at http://localhost:8000`);
});
