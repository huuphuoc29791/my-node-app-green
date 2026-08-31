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

// ==================================================

app.get('/students', (req, res) => {
	const sql = `SELECT s.*, c.name AS classroom_name
        FROM students s JOIN classrooms c ON s.classroom_id = c.id
        ORDER BY s.id`;
	db.query(sql, (err, results) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		res.render('students/index', {
			students: results
		});
	});
});

app.get('/students/create', (req, res) => {
	const sql = 'SELECT * FROM classrooms';
	db.query(sql, (err, results) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		res.render('students/create', {
			classrooms: results
		});
	});
});

app.post('/students/create', (req, res) => {
	const { name, age, classroom_id } = req.body;
	const sql =
		'INSERT INTO students (name, age, classroom_id) VALUES (?, ?, ?)';
	db.query(sql, [name, age, classroom_id], (err, results) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		res.redirect('/students');
	});
});

app.get('/students/:id/edit', (req, res) => {
	const { id } = req.params;
	const sqlStudent = 'SELECT * FROM students WHERE id = ?';
	db.query(sqlStudent, [id], (err, studentResults) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}

		if (studentResults.length == 0) {
			return res.send('Student not found');
		}

		const sqlClassrooms = 'SELECT * FROM classrooms';
		db.query(sqlClassrooms, (err, classroomResults) => {
			if (err) {
				console.error(err);
				return res.send('Database error');
			}
			res.render('students/edit', {
				student: studentResults[0],
				classrooms: classroomResults
			});
		});
	});
});

app.post('/students/:id/edit', (req, res) => {
	const { name, age, classroom_id } = req.body;
	const { id } = req.params;
	const sql =
		'UPDATE students SET name = ?, age = ?, classroom_id = ? WHERE id = ?';
	db.query(sql, [name, age, classroom_id, id], (err, results) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		res.redirect('/students');
	});
});

app.post('/students/:id/delete', (req, res) => {
	const { id } = req.params;
	const sql = 'DELETE FROM students WHERE id = ?';
	db.query(sql, [id], (err, results) => {
		if (err) {
			console.error(err);
			return res.send('Database error');
		}
		res.redirect('/students');
	});
});

// ==================================================

app.listen(8000, () => {
	console.log(`Server is running at http://localhost:8000`);
});
