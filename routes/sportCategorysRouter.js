const express = require("express");
const router = express.Router();

const sportCategorysControll = require("../controllers/sportCategorysControll");

router.post("/", sportCategorysControll.createSportCategorys);
router.get("/", sportCategorysControll.getSportCategorys);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
