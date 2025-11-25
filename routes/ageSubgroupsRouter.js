const express = require("express");
const router = express.Router();

const ageSubgroupsControll = require("../controllers/ageSubgroupsControll");

router.post("/", ageSubgroupsControll.createAgeSubgroups);
router.get("/", ageSubgroupsControll.getAgeSubgroups);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
