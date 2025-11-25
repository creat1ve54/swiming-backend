const { SportCategory } = require("../models/models");

class SportCategorysControll {
  async createSportCategorys(req, res) {
    const { name } = req.body;
    const sportCategorys = await SportCategory.create({
      name,
    });
    res.json(sportCategorys);
  }
  async getSportCategorys(req, res) {
    const sportCategorys = await SportCategory.findAll({
      order: [["id", "ASC"]],
    });
    res.json(sportCategorys);
  }
}

module.exports = new SportCategorysControll();
