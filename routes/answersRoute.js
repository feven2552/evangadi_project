const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { giveAnswer, getAnswer } = require("../controller/answerController");

router.post("/:questionid", giveAnswer);
router.get("/:questionid/getanswer", getAnswer);

module.exports = router;