const express = require("express");
const router = express.Router();

const elementsOfTechnicalProgramsControll = require("../controllers/elementsOfTechnicalProgramsControll");

router.post("/", elementsOfTechnicalProgramsControll.createElementsOfTechnicalPrograms);
router.get("/", elementsOfTechnicalProgramsControll.getElementsOfTechnicalPrograms);
// router.put("/", elementsOfTechnicalProgramsControll.putTeams);
// router.delete(`/:id`, elementsOfTechnicalProgramsControll.deleteTeam);

module.exports = router;
