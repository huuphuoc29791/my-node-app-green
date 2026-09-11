const express = require('express');
const app = express();

require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
