const express = require("express");
const router = express.Router();

const teamsControll = require("../controllers/teamsControll");

router.post("/", teamsControll.createTeams);
router.get("/", teamsControll.getTeams);
router.put("/", teamsControll.putTeams);
router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
