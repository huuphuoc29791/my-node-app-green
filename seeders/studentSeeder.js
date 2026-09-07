require('dotenv').config();

const db = require('../config/db');

const seed = async () => {
	try {
		await db.query('DELETE FROM students');

		await db.query('ALTER TABLE students AUTO_INCREMENT = 1');

		const students = [
			['Nguyen Van An', 20],
			['Tran Thi Binh', 21],
			['Le Hoang Nam', 19],
			['Pham Minh Chau', 22],
			['Vo Gia Huy', 20],
			['Dang Ngoc Lan', 21],
			['Bui Thanh Tung', 23],
			['Do Minh Anh', 19],
			['Hoang Quoc Bao', 20],
			['Phan Thanh Ha', 22]
		];

		await db.query('INSERT INTO students (name, age) VALUES ?', [students]);

		console.log('Students seeded successfully');

		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

seed();
