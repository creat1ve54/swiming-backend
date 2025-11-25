const express = require("express");
const router = express.Router();

const ageGroupsControll = require("../controllers/ageGroupsControll");

router.post("/", ageGroupsControll.createAgeGroups);
router.get("/", ageGroupsControll.getAgeGroups);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
