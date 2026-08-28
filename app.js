const express = require('express');
const mysql = require('mysql2');

const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Read data from HTML forms
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'shopdb'
});

db.connect(err => {
	if (err) {
		console.error('Cannot connect to MySQL: ', err);
		return;
	}
	console.log('Connected to MySQL');
});

// GET /products
app.get('/products', (req, res) => {
	const sql = 'SELECT * FROM products';
	db.query(sql, (err, results) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		res.render('products/index', {
			products: results
		});
	});
});

// GET /products/create
app.get('/products/create', (req, res) => {
	res.render('products/create');
});

// POST /products/create
app.post('/products/create', (req, res) => {
	const { name, price, description } = req.body;
	const sql =
		'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
	db.query(sql, [name, price, description], (err, result) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		res.redirect('/products');
	});
});

// GET /products/:id
app.get('/products/:id', (req, res) => {
	const { id } = req.params;
	const sql = 'SELECT * FROM products WHERE id = ?';
	db.query(sql, [id], (err, results) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		if (results.length == 0) {
			return res.send('Product not found');
		}
		res.render('products/details', {
			product: results[0]
		});
	});
});

// GET /products/:id/edit
app.get('/products/:id/edit', (req, res) => {
	const { id } = req.params;
	const sql = 'SELECT * FROM products WHERE id = ?';
	db.query(sql, [id], (err, results) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		if (results.length == 0) {
			return res.send('Product not found');
		}
		res.render('products/edit', {
			product: results[0]
		});
	});
});

// POST /products/:id/edit
app.post('/products/:id/edit', (req, res) => {
	const { id } = req.params;
	const { name, price, description } = req.body;
	const sql =
		'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
	db.query(sql, [name, price, description, id], (err, result) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		res.redirect('/products');
	});
});

// POST /products/:id/delete
app.post('/products/:id/delete', (req, res) => {
	const { id } = req.params;
	const sql = 'DELETE FROM products WHERE id = ?';
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		res.redirect('/products');
	});
});

// GET /login
app.get('/login', (req, res) => {
	res.render('login');
});

// POST /login
app.post('/login', (req, res) => {
	const { username, password } = req.body;
	const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
	db.query(sql, [username, password], (err, results) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		if (results.length == 0) {
			return res.send('Invalid username or password');
		}
		res.send('Login successful');
	});
});

app.listen(8000, () => {
	console.log(`Server is running at http://localhost:8000`);
});
