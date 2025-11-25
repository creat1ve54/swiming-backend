const {
  Execution,
  ArtisticImpression,
  Complexity,
} = require("../models/models");

class CompositionControll {
  // async createBrigade(req, res) {
  //   const {
  //     refereeOne,
  //     refereeTwo,
  //     refereeThree,
  //     refereeFour,
  //     refereeFife,
  //     refereeSix,
  //     refereeSeven,
  //   } = req.body;
  //   const brigadeOne = await BrigadeOne.create({
  //     refereeOne,
  //     refereeTwo,
  //     refereeThree,
  //     refereeFour,
  //     refereeFife,
  //     refereeSix,
  //     refereeSeven,
  //   });
  //   const brigadeTwo = await BrigadeTwo.create({
  //     refereeOne,
  //     refereeTwo,
  //     refereeThree,
  //     refereeFour,
  //     refereeFife,
  //     refereeSix,
  //     refereeSeven,
  //   });
  //   const brigadeThree = await BrigadeThree.create({
  //     refereeOne,
  //     refereeTwo,
  //     refereeThree,
  //     refereeFour,
  //     refereeFife,
  //     refereeSix,
  //     refereeSeven,
  //   });
  //   const brigadeFour = await BrigadeFour.create({
  //     refereeOne,
  //     refereeTwo,
  //     refereeThree,
  //     refereeFour,
  //     refereeFife,
  //     refereeSix,
  //     refereeSeven,
  //   });
  //   res.json({ brigadeOne, brigadeTwo, brigadeThree, brigadeFour });
  // }
  async getComposition(req, res) {
    const execution = await Execution.findAll();
    const artisticImpression = await ArtisticImpression.findAll();
    const complexity = await Complexity.findAll();
    res.json({ execution, artisticImpression, complexity });
  }
}

module.exports = new CompositionControll();
