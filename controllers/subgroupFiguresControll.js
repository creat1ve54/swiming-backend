const { SubgroupFigures, Figures } = require("../models/models");

class SubgroupFiguresControll {
  async saveSubgroupFigures(req, res) {
    const { subgroupFigureNew } = req.body;

    console.log(subgroupFigureNew);
    

    const subgroupFigure = await SubgroupFigures.findOne({
      where: { id: subgroupFigureNew.id },
    });

    subgroupFigure.figureId = subgroupFigureNew.figureId;
    subgroupFigure.brigadeNumber = subgroupFigureNew.brigadeNumber;

    await subgroupFigure.save();

    let resultRatio = 0;

    const subgroupFigures = await SubgroupFigures.findAll({
      order: [["id", "ASC"]],
      where: { subgroupId: subgroupFigureNew.subgroupId },
      include: { model: Figures },
    });

    subgroupFigures.forEach((item) => {
      if(item.figure) {
        resultRatio += item.figure.ratio
      }
    });

    res.json({subgroupFigures, resultRatio});
  }
  async getSubgroupFigures(req, res) {
    const { nameId } = req.params;

    let resultRatio = 0;

    const subgroupFigures = await SubgroupFigures.findAll({
      order: [["id", "ASC"]],
      where: { subgroupId: nameId },
      include: { model: Figures },
    });

    subgroupFigures.forEach((item) => {
      if(item.figure) {
        resultRatio += item.figure.ratio
      }
    });

    res.json({subgroupFigures, resultRatio});
  }
}

module.exports = new SubgroupFiguresControll();
