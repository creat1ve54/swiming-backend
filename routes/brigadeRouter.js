const express = require("express");
const router = express.Router();

const brigadeControll = require("../controllers/brigadeControll");

router.post("/", brigadeControll.createBrigade);
router.get("/", brigadeControll.getBrigades);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
