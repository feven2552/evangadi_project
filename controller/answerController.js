const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const express = require("express");

const app = express();

app.use(express.json());


async function giveAnswer(req, res) {
    const { answer } = req.body;
	const userid = req.user.userid;
    // const questionid = req.params.questionid;
    const { questionid } = req.params;
    if(!answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide an answer" });
    }
    
    try {
        await dbConnection.query("INSERT INTO answers (userid, questionid, answer) VALUES (?,?,?);", [userid, questionid, answer]);
        console.log(questionid)
        return res.status(StatusCodes.CREATED).json({msg: "you have answered successfully!!"})

    } catch (error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "something went wrong try again later!"})
    }

}


async function getAnswer(req, res) {
    const { questionid } = req.params;
    try {
        const [answerEntries] = await dbConnection.query("SELECT * FROM answers WHERE questionid = ?;", [questionid]);
        return res.status(StatusCodes.OK).json({answers: answerEntries})

    } catch (error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "something went wrong try again later!"})
    }
}

module.exports = { giveAnswer, getAnswer };
