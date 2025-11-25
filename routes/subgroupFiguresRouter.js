const express = require("express");
const router = express.Router();

const subgroupFiguresRouter = require("../controllers/subgroupFiguresControll");

router.post("/", subgroupFiguresRouter.saveSubgroupFigures);
router.get("/:nameId", subgroupFiguresRouter.getSubgroupFigures);
// router.put("/", teamsControll.putTeams);
// router.delete(`/:id`, teamsControll.deleteTeam);

module.exports = router;
