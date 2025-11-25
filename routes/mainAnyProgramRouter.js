const express = require("express");
const router = express.Router();

const mainAnyProgramControll = require("../controllers/mainAnyProgramControll");

router.post("/", mainAnyProgramControll.createMainAnyProgram);
router.get("/", mainAnyProgramControll.getMainProgram);
router.get("/document", mainAnyProgramControll.getMainProgramDocument);

module.exports = router;
