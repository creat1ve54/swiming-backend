const { DutiesOfJudges } = require("../models/models");

class DutiesOfJudgesControll {
  async createDutiesOfJudges(req, res) {
    const { name, nameShort } = req.body;
    const dutiesOfJudges = await DutiesOfJudges.create({
      name,
      nameShort,
    });
    res.json(dutiesOfJudges);
  }
  async getDutiesOfJudges(req, res) {
    const dutiesOfJudges = await DutiesOfJudges.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.json(dutiesOfJudges);
  }
}

module.exports = new DutiesOfJudgesControll();
