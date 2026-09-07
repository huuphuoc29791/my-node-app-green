const db = require('../config/db');

class Student {
	static async getAll() {
		const [rows] = await db.query('SELECT * FROM students ORDER BY id ASC');
		return rows;
	}
}

module.exports = Student;
