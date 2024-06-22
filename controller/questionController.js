const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function askQuestion(req, res) {
	const username = req.user.username;
	const userid = req.user.userid;
	// Generate a random alphanumeric string
	const questionid = crypto.randomBytes(16).toString("hex").slice(0, 32);
	const { title, description } = req.body;
	if (!title || !description) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please provide all required information!!" });
	}
	try {
		await dbConnection.query(
			"INSERT INTO questions (userid, questionid, title, description) VALUES (?,?,?,?)",
			[userid, questionid, title, description]
		);
		const [rows] = await dbConnection.query(
			"SELECT * FROM questions WHERE questionid = ?",
			[questionid]
			);
		console.log("specific:", rows)
		return res
			.status(StatusCodes.CREATED)
			.json({question: rows, username, questionid, msg: "Question added successfully!" });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Error adding question. Try again later!" });
	}
}

async function seeQuestions(req, res) {
	try {
		const [rows] = await dbConnection.query("SELECT * FROM questions");
		console.log("Retrieved questions:", rows);
		return res.status(StatusCodes.OK).json({ questions: rows[0] });
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Error retrieving questions. Try again later!" });
	}
}

async function oneQuestion(req, res) {
	const {questionid} = req.params;
	try {
		const [rows] = await dbConnection.query("SELECT * FROM questions WHERE questionid = ?", [questionid])
		if (rows.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({msg: "Question not found!"})
		}
		return res.status(StatusCodes.OK).json({question: rows})
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Error retrieving question. Try again later!" });
	}
}

module.exports = { askQuestion, seeQuestions, oneQuestion };
