const express = require("express");
const router = express.Router();

const mainBrigadeControll = require("../controllers/mainBrigadeControll");

router.post("/", mainBrigadeControll.createMainBrigade);
router.get("/", mainBrigadeControll.getMainBrigade);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
