const express = require("express");
const router = express.Router();

const mainProgramControll = require("../controllers/mainProgramControll");

router.post("/", mainProgramControll.createMainProgram);
router.get("/", mainProgramControll.getMainProgram);
router.get("/document", mainProgramControll.getMainProgramDocument);

module.exports = router;
