const express = require("express");
const router = express.Router();

const figuresControll = require("../controllers/figuresControll");

router.post("/", figuresControll.createFigures);
router.get("/", figuresControll.getFigures);
// router.put("/", figuresControll.putSportsmans);
// router.delete(`/:id`, figuresControll.deleteSportsman);

module.exports = router;
