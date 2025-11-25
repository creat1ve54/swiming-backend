const { MainBrigade } = require("../models/models");

class MainBrigadeControll {
  async createMainBrigade(req, res) {
    // const { kod, name, nameEng, ratio } = req.body;
    const mainBrigade = await MainBrigade.create({
      // listReferee,
    });
    res.json(mainBrigade);
  }
    async getMainBrigade(req, res) {
      const mainBrigade = await MainBrigade.findAll();
      res.json(mainBrigade);
    }
}

module.exports = new MainBrigadeControll();
