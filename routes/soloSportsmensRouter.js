const express = require("express");
const router = express.Router();

const soloSportsmensControll = require("../controllers/soloSportsmensControll");

router.post("/", soloSportsmensControll.createSoloSportsmens);
router.get("/", soloSportsmensControll.getSoloSportsmens);
// router.put("/", figuresControll.putSportsmans);
// router.delete(`/:id`, figuresControll.deleteSportsman);

module.exports = router;
