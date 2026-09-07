const db = require('../config/db');

const getAll = async () => {
	const [rows] = await db.query('SELECT * FROM students ORDER BY id ASC');
	return rows;
};

const getById = async id => {
	const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
	return rows[0];
};

const create = async (name, age) => {
	const [result] = await db.query(
		'INSERT INTO students (name, age) VALUES (?, ?)',
		[name, age]
	);
	return result;
};

const update = async (id, name, age) => {
	const [result] = await db.query(
		'UPDATE students SET name = ?, age = ? WHERE id = ?',
		[name, age, id]
	);
	return result;
};

const remove = async id => {
	const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);
	return result;
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove
};
