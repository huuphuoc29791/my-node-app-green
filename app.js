require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const studentRoutes = require('./routes/studentRoutes');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/students', studentRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
