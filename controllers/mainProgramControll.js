const {
  MainProgram,
  MainBrigade,
  BrigadeOne,
  BrigadeTwo,
  BrigadeThree,
  BrigadeFour,
  ListReferee,
  DutiesOfJudges,
  Referees,
  RefereesBrigades,
} = require("../models/models");
const { Op, Sequelize } = require("sequelize");

class MainProgramControll {
  async createMainProgram(req, res) {
    const {
      requiredProgramName,
      requiredProgramBrigadeMainId,
      requiredProgramBrigadeOne,
      requiredProgramBrigadeTwo,
      requiredProgramBrigadeThree,
      requiredProgramBrigadeFour,
    } = req.body;
    const mainProgram = await MainProgram.create({
      requiredProgramName,
      requiredProgramBrigadeMainId,
      requiredProgramBrigadeOne,
      requiredProgramBrigadeTwo,
      requiredProgramBrigadeThree,
      requiredProgramBrigadeFour,
    });
    res.json(mainProgram);
  }
  async getMainProgram(req, res) {
    const mainProgram = await MainProgram.findAll({
      order: [["id", "ASC"]],
    });
   

    await Promise.all(
      mainProgram.map(async (mainProgramItem) => {
        const mainBrigade = await MainBrigade.findOne({
          where: { id: mainProgramItem.mainBrigadeId },
          order: [
            ["id", "ASC"],
            [{ model: ListReferee, as: "listRefereeArray" }, "id", "ASC"],
          ],
          include: [
            {
              model: ListReferee,
              as: "listRefereeArray",
              include: [{ model: DutiesOfJudges }, { model: Referees }],
            },
          ],
        });

        console.log(mainBrigade);
        

        const brigadeOne = await BrigadeOne.findOne({
          where: {
            id: mainProgramItem.brigadeOneId,
          },
          order: [
            ["id", "ASC"],
            [{ model: RefereesBrigades, as: "refereesBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesBrigades,
              as: "refereesBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeTwo = await BrigadeTwo.findOne({
          where: { id: mainProgramItem.brigadeTwoId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesBrigades, as: "refereesBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesBrigades,
              as: "refereesBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeThree = await BrigadeThree.findOne({
          where: { id: mainProgramItem.brigadeThreeId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesBrigades, as: "refereesBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesBrigades,
              as: "refereesBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeFour = await BrigadeFour.findOne({
          where: { id: mainProgramItem.brigadeFourId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesBrigades, as: "refereesBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesBrigades,
              as: "refereesBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        mainProgramItem.mainBrigadeId = mainBrigade;
        mainProgramItem.brigadeOneId = brigadeOne;
        mainProgramItem.brigadeTwoId = brigadeTwo;
        mainProgramItem.brigadeThreeId = brigadeThree;
        mainProgramItem.brigadeFourId = brigadeFour;
        return mainProgramItem;
      })
    );

    res.json(mainProgram);
  }
  async getMainProgramDocument(req, res) {
    const mainProgram = await MainProgram.findAll({
      order: [["id", "ASC"]],
    });

    await Promise.all(
      mainProgram.map(async (mainProgramItem) => {
        const mainBrigade = await MainBrigade.findOne({
          where: { id: mainProgramItem.mainBrigadeId },
          order: [
            ["id", "ASC"],
            [{ model: ListReferee, as: "listRefereeArray" }, "id", "ASC"],
          ],
          include: [
            {
              model: ListReferee,
              as: "listRefereeArray",
              include: [{ model: DutiesOfJudges }, { model: Referees }],
            },
          ],
        });

        const brigadeOne = await BrigadeOne.findOne({
          where: {
            id: mainProgramItem.brigadeOneId,
          },
          order: [
            ["id", "ASC"],
            [{ model: RefereesBrigades, as: "refereesBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesBrigades,
              as: "refereesBrigades",
              required: false,
              where: {
                refereeId: {
                  [Op.ne]: null,
                },
              },
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeTwo = await BrigadeTwo.findOne({
          where: { id: mainProgramItem.brigadeTwoId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesBrigades, as: "refereesBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesBrigades,
              as: "refereesBrigades",
              required: false,
              where: {
                refereeId: {
                  [Op.ne]: null,
                },
              },
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeThree = await BrigadeThree.findOne({
          where: { id: mainProgramItem.brigadeThreeId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesBrigades, as: "refereesBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesBrigades,
              as: "refereesBrigades",
              required: false,
              where: {
                refereeId: {
                  [Op.ne]: null,
                },
              },
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeFour = await BrigadeFour.findOne({
          where: { id: mainProgramItem.brigadeFourId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesBrigades, as: "refereesBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesBrigades,
              as: "refereesBrigades",
              required: false,
              where: {
                refereeId: {
                  [Op.ne]: null,
                },
              },
              include: [{ model: Referees }],
            },
          ],
        });

        mainProgramItem.mainBrigadeId = mainBrigade;
        mainProgramItem.brigadeOneId = brigadeOne;
        mainProgramItem.brigadeTwoId = brigadeTwo;
        mainProgramItem.brigadeThreeId = brigadeThree;
        mainProgramItem.brigadeFourId = brigadeFour;
        return mainProgramItem;
      })
    );

    res.json(mainProgram);
  }
}

module.exports = new MainProgramControll();
