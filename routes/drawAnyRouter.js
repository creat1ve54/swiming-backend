const express = require("express");
const router = express.Router();

const drawAnyProgramControll = require("../controllers/drawsAnyProgramControll");

router.post("/", drawAnyProgramControll.saveDraw);
router.get(`/`, drawAnyProgramControll.getDraw);
router.post(`/change`, drawAnyProgramControll.changeManuallyDraw);
router.post(`/reset`, drawAnyProgramControll.resetDraw);
router.post(`/active`, drawAnyProgramControll.activeDraw);


// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
