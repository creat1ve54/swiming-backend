const express = require("express");
const router = express.Router();

const compositionControll = require("../controllers/compositionControll");

// router.post("/", compositionControll.);
router.get("/", compositionControll.getComposition);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
