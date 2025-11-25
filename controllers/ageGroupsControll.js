const { AgeGroups } = require("../models/models");

class AgeGroupsControll {
  async createAgeGroups(req, res) {
    const { name, nameShort } = req.body;
    const ageGroups = await AgeGroups.create({
      name,
      nameShort,
    });
    res.json(ageGroups);
  }
  async getAgeGroups(req, res) {
    const ageGroups = await AgeGroups.findAll({
      order: [["id", "ASC"]],
    });
    res.json(ageGroups);
  }
}

module.exports = new AgeGroupsControll();
