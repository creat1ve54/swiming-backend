const express = require("express");
const router = express.Router();

const refereesAnyProgramBrigadesControll = require("../controllers/refereesAnyProgramBrigadesControll");

// router.post("/", refereesBrigadesControll.createReferee);
// router.get("/", listRefereeControll.getReferees);
// router.put("/update-post", listRefereeControll.updatePost);
router.put("/update-referee", refereesAnyProgramBrigadesControll.updateReferee);
// router.put("/delete-referee", listRefereeControll.updateReferee);
// router.delete(`/:id`, listRefereeControll.deleteReferee);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
