const express = require("express");
const router = express.Router();

const anyTeamProgramControll = require("../controllers/anyTeamProgramControll");

router.post("/", anyTeamProgramControll.createAnyTeamProgram);
router.get("/", anyTeamProgramControll.getAnyTeamProgram);
router.get("/teams", anyTeamProgramControll.getAnyTeamProgramTeams);
router.put("/", anyTeamProgramControll.putAnyTeamProgram);
router.put("/sportsman", anyTeamProgramControll.putAnyTeamProgramSportsman);
router.put("/sportsman/out-of-competition", anyTeamProgramControll.putAnyTeamProgramSportsmanOutOfCompetition);
router.put("/out-of-competition", anyTeamProgramControll.putAnyTeamProgramOutOfCompetition);
router.post("/sportsman", anyTeamProgramControll.createAnyTeamProgramSportsman);
router.delete("/sportsman/:sportsman", anyTeamProgramControll.deleteAnyTeamProgramSportsman);
router.delete("/:id", anyTeamProgramControll.deleteAnyTeamProgramTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
