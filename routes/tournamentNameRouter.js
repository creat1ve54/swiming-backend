const express = require("express");
const router = express.Router();

const tournamentNameControll = require("../controllers/tournamentNameControll");

router.get("/", tournamentNameControll.getTournamentName);
router.put("/", tournamentNameControll.putTournamentName);

module.exports = router;
