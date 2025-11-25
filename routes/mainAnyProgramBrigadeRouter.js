const express = require("express");
const router = express.Router();

const mainAnyProgramBrigadeControll = require("../controllers/mainAnyProgramBrigadeControll");

router.post("/", mainAnyProgramBrigadeControll.createMainAnyProgramBrigade);
router.get("/", mainAnyProgramBrigadeControll.getMainAnyProgramBrigade);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
