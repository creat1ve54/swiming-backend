const { AgeSubgroup } = require("../models/models");

class AgeSubroupsControll {
  async createAgeSubgroups(req, res) {
    const { name, nameShort } = req.body;
    const ageSubgroups = await AgeSubgroup.create({});
    res.json(ageSubgroups);
  }
  async getAgeSubgroups(req, res) {
    const ageSubgroups = await AgeSubgroup.findAll({
      order: [["id", "ASC"]],
    });
    res.json(ageSubgroups);
  }
}

module.exports = new AgeSubroupsControll();
