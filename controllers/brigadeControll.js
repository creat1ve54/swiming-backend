const {
  BrigadeOne,
  BrigadeTwo,
  BrigadeThree,
  BrigadeFour,
} = require("../models/models");

class BrigadeControll {
  async createBrigade(req, res) {
    const {
      refereeOne,
      refereeTwo,
      refereeThree,
      refereeFour,
      refereeFife,
      refereeSix,
      refereeSeven,
    } = req.body;
    const brigadeOne = await BrigadeOne.create({
      refereeOne,
      refereeTwo,
      refereeThree,
      refereeFour,
      refereeFife,
      refereeSix,
      refereeSeven,
    });
    const brigadeTwo = await BrigadeTwo.create({
      refereeOne,
      refereeTwo,
      refereeThree,
      refereeFour,
      refereeFife,
      refereeSix,
      refereeSeven,
    });
    const brigadeThree = await BrigadeThree.create({
      refereeOne,
      refereeTwo,
      refereeThree,
      refereeFour,
      refereeFife,
      refereeSix,
      refereeSeven,
    });
    const brigadeFour = await BrigadeFour.create({
      refereeOne,
      refereeTwo,
      refereeThree,
      refereeFour,
      refereeFife,
      refereeSix,
      refereeSeven,
    });
    res.json({ brigadeOne, brigadeTwo, brigadeThree, brigadeFour });
  }
  async getBrigades(req, res) {
    const brigadeOne = await BrigadeOne.findAll();
    const brigadeTwo = await BrigadeTwo.findAll();
    const brigadeThree = await BrigadeThree.findAll();
    const brigadeFour = await BrigadeFour.findAll();
    res.json({ brigadeOne, brigadeTwo, brigadeThree, brigadeFour });
  }
}

module.exports = new BrigadeControll();
