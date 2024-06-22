const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const { askQuestion, seeQuestions, oneQuestion } = require("../controller/questionController");

router.post("/ask-questions", askQuestion);

router.get("/see-questions", seeQuestions);

router.get("/:questionid", oneQuestion);

module.exports = router;
