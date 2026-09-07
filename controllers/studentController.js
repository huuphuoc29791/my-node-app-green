const Student = require('../models/studentModel');

const index = async (req, res) => {
	const students = await Student.getAll();
	res.render('students/index', { students });
};

module.exports = {
	index
};
