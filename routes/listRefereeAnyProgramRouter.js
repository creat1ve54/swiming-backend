const express = require("express");
const router = express.Router();

const listRefereeAnyProgramControll = require("../controllers/listRefereeAnyProgramControll");

router.post("/", listRefereeAnyProgramControll.createReferee);
router.get("/", listRefereeAnyProgramControll.getReferees);
router.put("/update-post", listRefereeAnyProgramControll.updatePost);
router.put("/update-referee", listRefereeAnyProgramControll.updateReferee);
// router.put("/delete-referee", listRefereeControll.updateReferee);
router.delete(`/:id`, listRefereeAnyProgramControll.deleteReferee);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
