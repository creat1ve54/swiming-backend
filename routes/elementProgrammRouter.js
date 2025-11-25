const express = require("express");
const router = express.Router();

const elementProgramControll = require("../controllers/elementProgramControll");

router.post("/", elementProgramControll.createElementProgram);
router.get("/", elementProgramControll.getElementProgram);
// router.put("/", elementProgramControll.putTeams);
// router.delete(`/:id`, elementProgramControll.deleteTeam);

module.exports = router;
