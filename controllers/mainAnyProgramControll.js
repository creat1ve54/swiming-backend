const {
  MainAnyProgram,
  MainBrigade,
  ListReferee,
  DutiesOfJudges,
  Referees,

  MainAnyProgramBrigade,
  ListRefereeAnyProgram,
  BrigadeEl,
  BrigadeAl,
  BrigadeDTC,
  BrigadeSTC,
  RefereesAnyProgramBrigades,
} = require("../models/models");
const { Op, Sequelize } = require("sequelize");

class MainAnyProgramControll {
  async createMainAnyProgram(req, res) {
    const {
      requiredProgramName,
      requiredProgramCaption,
      requiredProgramBrigadeMainId,
      requiredProgramExecution,
      requiredProgramArtisticImpression,
      requiredProgramComplexity,
    } = req.body;
    const mainProgram = await MainAnyProgram.create({
      requiredProgramName,
      requiredProgramCaption,
      requiredProgramBrigadeMainId,
      requiredProgramExecution,
      requiredProgramArtisticImpression,
      requiredProgramComplexity,
    });
    res.json(mainProgram);
  }

  async getMainProgram(req, res) {
    const mainProgram = await MainAnyProgram.findAll({
      order: [["id", "ASC"]],
    });

  
    await Promise.all(
      mainProgram.map(async (mainProgramItem) => {

        const mainBrigade = await MainAnyProgramBrigade.findOne({
          where: { id: mainProgramItem.mainAnyProgramBrigadeId },
          order: [
            ["id", "ASC"],
            [{ model: ListRefereeAnyProgram, as: "listRefereeArray" }, "id", "ASC"],
          ],
          include: [
            {
              model: ListRefereeAnyProgram,
              as: "listRefereeArray",
              include: [{ model: DutiesOfJudges }, { model: Referees }],
            },
          ],
        });

        console.log(mainBrigade);       

        const brigadeEl = await BrigadeEl.findOne({
          where: {
            id: mainProgramItem.brigadeElId,
          },
          order: [
            ["id", "ASC"],
            [{ model: RefereesAnyProgramBrigades, as: "refereesAnyBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesAnyProgramBrigades,
              as: "refereesAnyBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeAl = await BrigadeAl.findOne({
          where: { id: mainProgramItem.brigadeAlId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesAnyProgramBrigades, as: "refereesAnyBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesAnyProgramBrigades,
              as: "refereesAnyBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeDTC = await BrigadeDTC.findOne({
          where: { id: mainProgramItem.brigadeDTCId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesAnyProgramBrigades, as: "refereesAnyBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesAnyProgramBrigades,
              as: "refereesAnyBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeSTC = await BrigadeSTC.findOne({
          where: { id: mainProgramItem.brigadeSTCId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesAnyProgramBrigades, as: "refereesAnyBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesAnyProgramBrigades,
              as: "refereesAnyBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        mainProgramItem.mainAnyProgramBrigadeId = mainBrigade;
        mainProgramItem.brigadeElId = brigadeEl;
        mainProgramItem.brigadeAlId = brigadeAl;
        mainProgramItem.brigadeDTCId = brigadeDTC;
        mainProgramItem.brigadeSTCId = brigadeSTC;
        return mainProgramItem;
      })
    );

    res.json(mainProgram);
  }

  async getMainProgramDocument(req, res) {
    const mainProgram = await MainAnyProgram.findAll({
      order: [["id", "ASC"]],
    });

    await Promise.all(
      mainProgram.map(async (mainProgramItem) => {      

        const mainBrigade = await MainBrigade.findOne({
          where: { id: mainProgramItem.mainAnyProgramBrigadeId },
          order: [
            ["id", "ASC"],
            [{ model: ListRefereeAnyProgram, as: "listRefereeArray" }, "id", "ASC"],
          ],
          include: [
            {
              model: ListRefereeAnyProgram,
              as: "listRefereeArray",
              include: [{ model: DutiesOfJudges }, { model: Referees }],
            },
          ],
        });

 

        const brigadeEl = await BrigadeEl.findOne({
          where: {
            id: mainProgramItem.brigadeElId,
          },
          order: [
            ["id", "ASC"],
            [{ model: RefereesAnyProgramBrigades, as: "refereesAnyBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesAnyProgramBrigades,
              as: "refereesAnyBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeAl = await BrigadeAl.findOne({
          where: { id: mainProgramItem.brigadeAlId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesAnyProgramBrigades, as: "refereesAnyBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesAnyProgramBrigades,
              as: "refereesAnyBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeDTC = await BrigadeDTC.findOne({
          where: { id: mainProgramItem.brigadeDTCId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesAnyProgramBrigades, as: "refereesAnyBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesAnyProgramBrigades,
              as: "refereesAnyBrigades",
              include: [{ model: Referees }],
            },
          ],
        });

        const brigadeSTC = await BrigadeSTC.findOne({
          where: { id: mainProgramItem.brigadeSTCId },
          order: [
            ["id", "ASC"],
            [{ model: RefereesAnyProgramBrigades, as: "refereesAnyBrigades" }, "id", "ASC"],
          ],
          include: [
            {
              model: RefereesAnyProgramBrigades,
              as: "refereesAnyBrigades",
              include: [{ model: Referees }],
            },
          ],
        });


        mainProgramItem.mainBrigadeId = mainBrigade;
        mainProgramItem.brigadeElId = brigadeEl;
        mainProgramItem.brigadeAlId = brigadeAl;
        mainProgramItem.brigadeDTCId = brigadeDTC;
        mainProgramItem.brigadeSTCId = brigadeSTC;
        return mainProgramItem;
      })
    );

    res.json(mainProgram);
  }
}

module.exports = new MainAnyProgramControll();
