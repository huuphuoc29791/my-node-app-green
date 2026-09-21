const showLogin = (req, res) => {
	res.render('cookie/login');
};

const login = (req, res) => {
	const { username, password } = req.body;
	if (username == 'admin' && password == '123456') {
		res.cookie('username', username, {
			maxAge: 60 * 60 * 1000
		});
		return res.redirect('/cookie/home');
	}
};

const home = (req, res) => {
	let username = req.cookies.username;
	if (!username) {
		username = 'Guest';
	}
	res.render('cookie/home', { username });
};

const logout = (req, res) => {
	res.clearCookie('username');
	res.redirect('/cookie/home');
};

module.exports = {
	showLogin,
	login,
	home,
	logout
};
