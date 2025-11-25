const { SoloSportsmens } = require("../models/models");

class SoloSportsmensControll {
  async createSoloSportsmens(req, res) {}
  async getSoloSportsmens(req, res) {
    const soloSportsmens = await SoloSportsmens.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.json(soloSportsmens);
  }
}

module.exports = new SoloSportsmensControll();
