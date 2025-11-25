const express = require("express");
const router = express.Router();

const dutiesOfJudgesControll = require("../controllers/dutiesOfJudgesControll");

router.post("/", dutiesOfJudgesControll.createDutiesOfJudges);
router.get("/", dutiesOfJudgesControll.getDutiesOfJudges);
// router.put("/", figuresControll.putSportsmans);
// router.delete(`/:id`, figuresControll.deleteSportsman);

module.exports = router;