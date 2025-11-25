const express = require("express");
const router = express.Router();

const ratingsAnyProgramControll = require("../controllers/ratingsAnyProgramControll");

router.get("/", ratingsAnyProgramControll.getRatings);
router.put("/", ratingsAnyProgramControll.saveActiveRatings);
router.put("/dd", ratingsAnyProgramControll.saveActiveDD);
router.put("/sinxr", ratingsAnyProgramControll.saveActivSinxr);
router.put("/element", ratingsAnyProgramControll.saveActiveRatingsElement);
router.put("/impression", ratingsAnyProgramControll.saveActiveRatingsImpression);
router.put("/impression/element", ratingsAnyProgramControll.saveActiveRatingsElementImpression);
// router.delete(`/:id`, refereeControll.deleteReferee);

module.exports = router;
