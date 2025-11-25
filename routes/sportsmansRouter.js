const express = require("express");
const router = express.Router();

const sportsmansControll = require("../controllers/sportsmansControll");

router.post("/", sportsmansControll.createSportsmans);
router.get("/", sportsmansControll.getSportsmans);
router.put("/", sportsmansControll.putSportsmans);
router.delete(`/:id`, sportsmansControll.deleteSportsman);

module.exports = router;
