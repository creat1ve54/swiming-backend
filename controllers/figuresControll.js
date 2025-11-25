const { Figures } = require("../models/models");

class FiguresControll {
  async createFigures(req, res) {
    const { kod, name, nameEng, ratio } = req.body;
    const figures = await Figures.create({
      kod,
      name,
      nameEng,
      ratio,
    });
    res.json(figures);
  }
  async getFigures(req, res) {
    const figures = await Figures.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.json(figures);
  }
}

module.exports = new FiguresControll();
