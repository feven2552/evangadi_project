const dbConnection = require("../db/dbConfig");

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

async function register(req, res) {
	const { username, firstname, lastname, email, password } = req.body;
	if (!email || !username || !firstname || !lastname || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please provide all required information!!" });
	}

	try {
		const [user] = await dbConnection.query(
			"select username, userid from users where username = ? or email= ? ",
			[username, email]
		);
		// return res.json({users: user})
		if (user.length > 0) {
			// console.log(user);
			return res.status(400).json({ msg: "user already registered" });
		}
		if (password.length <= 8) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "password must be at least 8 character" });
		}

		// encrypt the passsword
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		await dbConnection.query(
			"INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?) ",
			[username, firstname, lastname, email, hashedPassword]
		);
		// console.table(results);
		// const id = results.insertId;
		// console.log(id)
		return res
			.status(StatusCodes.CREATED)
			.json({ msg: "user have been created." });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong try again later!" });
	}

	// res.send("register");
}
async function login(req, res) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please enter all required fields" });
	}

	try {
		const [user] = await dbConnection.query(
			"select username, userid, password from users where email = ? ",
			[email]
		);
		// return res.json({user: user})
		if (user.length === 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "invalid email address!" });
		}
		// compare password
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "invalid password!" });
		}
		// res.json("user exist")
		const username = user[0].username;
		const userid = user[0].userid;
		const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		return res
			.status(StatusCodes.OK)
			.json({ msg: "user login successful", token, username });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong try again later!" });
	}
}
async function checkUser(req, res) {
	const username = req.user.username;
	const userid = req.user.userid;
	res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
	// res.send("check user");
}

module.exports = { register, login, checkUser };
