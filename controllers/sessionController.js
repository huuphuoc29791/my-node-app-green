const showLogin = (req, res) => {
	res.render('session/login');
};

const login = (req, res) => {
	const { username, password } = req.body;
	if (username == 'admin' && password == '123456') {
		req.session.username = username;
		return res.redirect('/session/home');
	}
};

const home = (req, res) => {
	let username = req.session.username;
	if (!username) {
		username = 'Guest';
	}
	res.render('session/home', { username });
};

const logout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/session/home');
	});
};

module.exports = {
	showLogin,
	login,
	home,
	logout
};
