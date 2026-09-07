const Student = require('../models/studentModel');

const index = async (req, res) => {
	const students = await Student.getAll();
	res.render('students/index', { students });
};

const details = async (req, res) => {
	const { id } = req.params;
	const student = await Student.getById(id);
	res.render('students/details', { student });
};

const createForm = (req, res) => {
	res.render('students/create');
};

const store = async (req, res) => {
	const { name, age } = req.body;
	await Student.create(name, age);
	res.redirect('/students');
};

const editForm = async (req, res) => {
	const { id } = req.params;
	const student = await Student.getById(id);
	res.render('students/edit', { student });
};

const update = async (req, res) => {
	const { id } = req.params;
	const { name, age } = req.body;
	await Student.update(id, name, age);
	res.redirect('/students');
};

const remove = async (req, res) => {
	const { id } = req.params;
	await Student.remove(id);
	res.redirect('/students');
};

module.exports = {
	index,
	details,
	createForm,
	store,
	editForm,
	update,
	remove
};
