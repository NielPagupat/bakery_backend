const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/dbConnection');
const AuthModel = require('../../models/auth/authModel');

module.exports.LogIn = async function (req, res) {
	const { username, password } = req.body;
	try {
		const user = await AuthModel.findUserName(username);
		if (!user) return res.status(400).json({ error: 'Invalid username or password' });
		// if (user.access_token) return res.status(400).json({ error: 'User is already logged in on another device.' });
		if (user.is_disable === 1) return res.status(400).json({ error: 'Account locked. Please contact support.' });
		const match = await bcrypt.compare(password, user.Password);
		if (!match) {
			return res.status(400).json({ error: 'Invalid password!' });
		}
		const userID = user.LoginID;
		const userName = user.Username;
		const Fname = user.FullName;
		const Desc = user.Description;
		const UserLevel = user.UserLevel;
		const accessToken = jwt.sign({ userID, userName, Fname, Desc, UserLevel }, process.env.SECRET_KEY, {
			expiresIn: '1d'
		});
		await db.query('UPDATE tbllogin SET access_token = ? WHERE LoginID  = ?;', [
			accessToken, user.LoginID
		]);
		await db.query('UPDATE tbllogin SET last_login = now() WHERE LoginID  =?;', [
			user.LoginID,
		]);
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		});
		res.status(200).json({accessToken:accessToken});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
}

module.exports.userLogout = async function(req, res) {
	const accessToken = req.cookies.accessToken;
	if(!accessToken) return res.sendStatus(204);
	const user = await AuthModel.findAll(accessToken);
	if(!user) return res.sendStatus(204);
	  await db.query('UPDATE tbllogin SET access_token = ?, last_login = now() WHERE LoginID  = ?', [
		'', user.LoginID
	]);
	res.clearCookie('accessToken');
	return res.sendStatus(200);
}