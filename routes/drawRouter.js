const express = require("express");
const router = express.Router();

const drawControll = require("../controllers/drawsControll");

router.post("/", drawControll.saveDraw);
router.get(`/`, drawControll.getDraw);
router.post(`/change`, drawControll.changeManuallyDraw);
router.post(`/reset`, drawControll.resetDraw);
router.post(`/active`, drawControll.activeDraw);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
