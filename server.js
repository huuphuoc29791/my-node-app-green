const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const cookieRoutes = require('./routes/cookieRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
	session({
		secret: '123ABC',
		resave: false,
		saveUninitialized: false
	})
);

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use('/cookie', cookieRoutes);
app.use('/session', sessionRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
