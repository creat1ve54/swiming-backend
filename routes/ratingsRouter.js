const express = require("express");
const router = express.Router();

const ratingsControll = require("../controllers/ratingsControll");

router.get("/:nameId", ratingsControll.getRatings);
router.put("/", ratingsControll.saveActiveRatings);
// router.delete(`/:id`, refereeControll.deleteReferee);

module.exports = router;
