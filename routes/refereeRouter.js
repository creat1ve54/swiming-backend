const express = require("express");
const router = express.Router();

const refereeControll = require("../controllers/refereeControll");

router.post("/", refereeControll.createReferee);
router.get("/", refereeControll.getReferee);
router.put("/", refereeControll.updateReferee);
router.delete(`/:id`, refereeControll.deleteReferee);

module.exports = router;
