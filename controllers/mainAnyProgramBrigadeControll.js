const { MainAnyProgramBrigade } = require("../models/models");

class mainAnyProgramBrigadeControll {
  async createMainAnyProgramBrigade(req, res) {
    // const { kod, name, nameEng, ratio } = req.body;
    const mainAnyProgramBrigade = await MainAnyProgramBrigade.create({
      // listReferee,
    });
    res.json(mainAnyProgramBrigade);
  }
    async getMainAnyProgramBrigade(req, res) {
      const mainAnyProgramBrigade = await MainAnyProgramBrigade.findAll();
      res.json(mainAnyProgramBrigade);
    }
}

module.exports = new mainAnyProgramBrigadeControll();
