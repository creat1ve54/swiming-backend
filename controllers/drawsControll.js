const { Op } = require("sequelize");
const sequelize = require("../db");
const {
  Draw,
  Sportsmans,
  Teams,
  MPOne,
  MPTwo,
  MPThree,
  MPFour,
  MPOneScore,
  MPTwoScore,
  MPThreeScore,
  MPFourScore,
  SubgroupFigures,
  MainProgram,
  BrigadeOne,
  RefereesBrigades,
  Referees,
  Execution,
  MainAnyProgram,
  RefereesAnyProgrammBrigades,
} = require("../models/models");

let AnyProgramFunc = (nameId, anyProgramName) => {
  let arrayEmpty = [];
  let arraySolo = [5, 10, 15];
  let arrayDuo = [6, 11, 16];
  let arrayDuoMixed = [7, 12, 17];
  let arrayGroup = [8, 13, 18];
  let arrayCombi = [9, 14, 19];
  let ageSubgroup = 0;

  let array = arrayEmpty.concat(
    arraySolo,
    arrayDuo,
    arrayDuoMixed,
    arrayGroup,
    arrayCombi
  );

  if (
    array.indexOf(Number(nameId)) >= 0 &&
    array.indexOf(Number(nameId)) <= 4 &&
    anyProgramName === "До 13 лет"
  ) {
    ageSubgroup = 3;
  }
  if (
    array.indexOf(Number(nameId)) >= 5 &&
    array.indexOf(Number(nameId)) <= 9 &&
    anyProgramName === "13-15 лет"
  ) {
    ageSubgroup = 2;
  }
  if (
    array.indexOf(Number(nameId)) >= 9 &&
    array.indexOf(Number(nameId)) <= 14 &&
    anyProgramName === "Юниоры"
  ) {
    ageSubgroup = 1;
  }

  return ageSubgroup;
};

class DrawControll {
  async saveDraw(req, res) {
    const { draw } = req.body;

    let findDraw;

    if (draw.nameId > 4) {
      findDraw = await Draw.findOne({
        where: { id: draw.nameId },
      });
    } else {
      findDraw = await Draw.findOne({
        where: { id: draw.nameId + 1 },
      });
    }

    let drawSave;

    if (findDraw) {
      // (findDraw.nameId = draw.nameId),
      (findDraw.drawOne = draw.drawOne),
        (findDraw.drawTwo = draw.drawTwo),
        (findDraw.drawThree = draw.drawThree),
        // (findDraw.sportsmans = draw.sportsmans),
        (drawSave = await findDraw.save());
    } else {
      await Draw.create({
        // nameId: draw.nameId,
        drawOne: draw.drawOne,
        drawTwo: draw.drawTwo,
        drawThree: draw.drawThree,
        // sportsmans: draw.sportsmans,
      });
    }

    if (draw.nameId > 4) {
      drawSave = await Draw.findOne({
        where: { id: draw.nameId },
      });

      let ageSubgroup = AnyProgramFunc(draw.nameId, draw.anyProgramName);

      let sportsmans = await Sportsmans.findAll({
        where: { ageSubgroupId: ageSubgroup, [draw.anyProgram]: true, requiredProgramm: true, },
        include: { model: Teams },
      });

      drawSave.dataValues.sportsmansArray = sportsmans;
      drawSave.sportsmansArray = sportsmans;
    } else {
      drawSave = await Draw.findOne({
        where: { id: draw.nameId + 1 },
        include: [
          {
            model: Sportsmans,
            as: "sportsmansArray",
            where: {
              requiredProgramm: true,
            },
            include: { model: Teams },
          },
        ],
      });
    }

    res.json(drawSave);
  }

  async getDraw(req, res) {
    const { nameId, anyProgram, anyProgramName } = req.query;
    const ageSubgroupNumber = Number(nameId) + 1;

    let draw;

    console.log(req.query);
    console.log(ageSubgroupNumber);

    if (nameId > 4) {
      draw = await Draw.findOne({
        where: { id: nameId },
      });

      let ageSubgroup = AnyProgramFunc(nameId, anyProgramName);

      let sportsmans = await Sportsmans.findAll({
        where: {
          ageSubgroupId: ageSubgroup,
          [anyProgram]: true,
          requiredProgram: true,
        },
        include: { model: Teams },
      });

      draw.dataValues.sportsmansArray = sportsmans;
      draw.sportsmansArray = sportsmans;
    } else {
      draw = await Draw.findOne({
        where: { id: ageSubgroupNumber },
        include: [
          {
            model: Sportsmans,
            where: {
              requiredProgramm: true,
            },
            as: "sportsmansArray",
            include: { model: Teams },
          },
        ],
      });
    }

    let arr = Array.from(
      { length: draw.sportsmansArray.length },
      (_, index) => 0
    );

    // console.log(arr);

    if (draw.drawOne === null) {
      draw.drawOne = arr;
    }
    if (draw.drawTwo === null) {
      draw.drawTwo = arr;
    }
    if (draw.drawThree === null) {
      draw.drawThree = arr;
    }

    await draw.save();

    res.json(draw);
  }

  async resetDraw(req, res) {
    const { nameId, activeDraw, anyProgram, anyProgramName } = req.body.draw;

    let draw;

    draw = await Draw.findOne({
      where: { id: nameId + 1 },
      include: [
        {
          model: Sportsmans,
          where: {
            requiredProgramm: true,
          },
          as: "sportsmansArray",
          include: { model: Teams },
        },
      ],
    });

    if (activeDraw == null) {
      draw.drawOne = [];
      draw.drawTwo = [];
      draw.drawThree = [];
      draw.activeDraw = null;

      switch (nameId) {
        case 1:
          await MPOneScore.drop();
          await MPOne.drop();
          await sequelize.sync();
          break;

        case 2:
          await MPTwoScore.drop();
          await MPTwo.drop();
          await sequelize.sync();
          break;

        case 3:
          await MPThreeScore.drop();
          await MPThree.drop();
          await sequelize.sync();
          break;

        case 4:
          await MPFourScore.drop();
          await MPFour.drop();
          await sequelize.sync();
          break;

        default:
          break;
      }
    } else {
      if (nameId > 4) {
        let ageSubgroup = AnyProgramFunc(nameId, anyProgramName);
        let sportsmans = await Sportsmans.findAll({
          where: {
            ageSubgroupId: ageSubgroup,
            [anyProgram]: true,
            requiredProgramm: true,
          },
          include: { model: Teams },
        });

        draw.dataValues.sportsmansArray = sportsmans;
        draw.sportsmansArray = sportsmans;
      } else {
        draw = await Draw.findOne({
          where: { id: nameId + 1 },
          include: [
            {
              model: Sportsmans,
              as: "sportsmansArray",
              where: {
                requiredProgramm: true,
              },
              include: { model: Teams },
            },
          ],
        });
      }

      let arr = Array.from(
        { length: draw.sportsmansArray.length },
        (_, index) => 0
      );

      if (draw.drawOne === null) {
        draw.drawOne = arr;
      }
      if (draw.drawTwo === null) {
        draw.drawTwo = arr;
      }
      if (draw.drawThree === null) {
        draw.drawThree = arr;
      }
    }

    await draw.save();

    res.json(draw);
  }

  async changeManuallyDraw(req, res) {
    const {
      nameId,
      drawChange,
      drawPositionChange,
      drawValueChange,
      anyProgram,
      anyProgramName,
    } = req.body.draw;

    let draw;

    if (nameId > 4) {
      draw = await Draw.findOne({
        where: { id: nameId },
      });

      let ageSubgroup = AnyProgramFunc(nameId, anyProgramName);

      let sportsmans = await Sportsmans.findAll({
        where: { ageSubgroupId: ageSubgroup, [anyProgram]: true, requiredProgramm: true, },
        include: { model: Teams },
      });

      draw.dataValues.sportsmansArray = sportsmans;
      draw.sportsmansArray = sportsmans;
    } else {
      draw = await Draw.findOne({
        where: { id: nameId + 1 },
        include: [
          {
            model: Sportsmans,
            as: "sportsmansArray",
            where: {
              requiredProgramm: true,
            },
            include: { model: Teams },
          },
        ],
      });
    }

    if (
      draw[`${drawChange}`].includes(drawValueChange) &&
      drawValueChange != 0
    ) {
      return res.json({ draw, message: "Номер не должен повторятся" });
    }

    let array = [...draw[`${drawChange}`]];

    array[drawPositionChange] = drawValueChange;
    draw[`${drawChange}`] = array;

    await draw.save();
    res.json({ draw });
  }

  async activeDraw(req, res) {
    const {
      nameId,
      activeDraw,
      anyProgramName,
      anyProgram,
      groupId,
      disciplineId,
    } = req.body.draw;

    let draw;

    if (nameId > 4) {
      console.log(7777);
      draw = await Draw.findOne({
        where: { id: nameId },
      });

      console.log(draw);

      let ageSubgroup = AnyProgramFunc(nameId, anyProgramName);

      let sportsmans = await Sportsmans.findAll({
        where: { ageSubgroupId: ageSubgroup, [anyProgram]: true, requiredProgramm: true, },
        include: { model: Teams },
      });

      draw.dataValues.sportsmansArray = sportsmans;
      draw.sportsmansArray = sportsmans;
    } else {
      draw = await Draw.findOne({
        where: { id: nameId + 1 },
        include: [
          {
            model: Sportsmans,
            as: "sportsmansArray",
            where: {
              requiredProgramm: true,
            },
            include: { model: Teams },
          },
        ],
      });
    }

    draw.activeDraw = activeDraw;
    await draw.save();

    if (nameId > 4) {
      let drawArray;
      switch (draw.activeDraw) {
        case 1:
          drawArray = draw.drawOne;
          break;

        case 2:
          drawArray = draw.drawTwo;
          break;

        case 3:
          drawArray = draw.drawThree;
          break;

        default:
          break;
      }

      const mainAnyProgram = await MainAnyProgram.findOne({
        where: {
          id: nameId - 4,
        },
      });

      let execution = await Execution.findOne({
        where: {
          id: mainAnyProgram.executionId,
        },
        order: [
          ["id", "ASC"],
          [
            {
              model: RefereesAnyProgrammBrigades,
              as: "refereesAnyProgrammBrigades",
            },
            "id",
            "ASC",
          ],
        ],
        include: [
          {
            model: RefereesAnyProgrammBrigades,
            as: "refereesAnyProgrammBrigades",
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

      let refereesLength = execution.refereesAnyProgrammBrigades.length;

      let scores = [];

      for (let index = 0; index < refereesLength; index++) {
        scores.push(0);
      }
    } else {
      let drawArray;
      switch (draw.activeDraw) {
        case 1:
          drawArray = draw.drawOne;
          break;

        case 2:
          drawArray = draw.drawTwo;
          break;

        case 3:
          drawArray = draw.drawThree;
          break;

        default:
          break;
      }

      const mainProgram = await MainProgram.findOne({
        where: {
          id: nameId,
        },
      });

      let brigadeOne = await BrigadeOne.findOne({
        where: {
          id: mainProgram.brigadeOneId,
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

      let refereesLength = brigadeOne.refereesBrigades.length;

      let scores = [];

      for (let index = 0; index < refereesLength; index++) {
        scores.push(0);
      }

      const subgroupFiguresArray = await SubgroupFigures.findAll({
        order: [["id", "ASC"]],
        where: { subgroupId: nameId },
        // include: { model: Figures },
      });

      switch (nameId) {
        case 1:
          await MPOneScore.drop();
          await MPOne.drop();
          await sequelize.sync();

          for (let index = 0; index < draw.sportsmansArray.length; index++) {
            await MPOne.create({
              sportsmanId: draw.sportsmansArray[index].id,
              drawsNumber: drawArray[index],
            });
          }

          for (let index = 0; index < draw.sportsmansArray.length; index++) {
            await MPOneScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[0].id,
              scores: scores,
              MPOneId: index + 1,
            });
            await MPOneScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[1].id,
              scores: scores,
              MPOneId: index + 1,
            });
            await MPOneScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[2].id,
              scores: scores,
              MPOneId: index + 1,
            });
            await MPOneScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[3].id,
              scores: scores,
              MPOneId: index + 1,
            });
          }
          break;

        case 2:
          await MPTwoScore.drop();
          await MPTwo.drop();
          await sequelize.sync();

          for (let index = 0; index < draw.sportsmansArray.length; index++) {
            await MPTwo.create({
              sportsmanId: draw.sportsmansArray[index].id,
              drawsNumber: drawArray[index],
            });
          }

          for (let index = 0; index < draw.sportsmansArray.length; index++) {
            await MPTwoScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[0].id,
              scores: scores,
              MPTwoId: index + 1,
            });
            await MPTwoScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[1].id,
              scores: scores,
              MPTwoId: index + 1,
            });
            await MPTwoScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[2].id,
              scores: scores,
              MPTwoId: index + 1,
            });
            await MPTwoScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[3].id,
              scores: scores,
              MPTwoId: index + 1,
            });
          }
          break;

        case 3:
          await MPThreeScore.drop();
          await MPThree.drop();
          await sequelize.sync();

          for (let index = 0; index < draw.sportsmansArray.length; index++) {
            await MPThree.create({
              sportsmanId: draw.sportsmansArray[index].id,
              drawsNumber: drawArray[index],
            });
          }

          for (let index = 0; index < draw.sportsmansArray.length; index++) {
            await MPThreeScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[0].id,
              scores: scores,
              MPThreeId: index + 1,
            });
            await MPThreeScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[1].id,
              scores: scores,
              MPThreeId: index + 1,
            });
            await MPThreeScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[2].id,
              scores: scores,
              MPThreeId: index + 1,
            });
            await MPThreeScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[3].id,
              scores: scores,
              MPThreeId: index + 1,
            });
          }
          break;

        case 4:
          await MPFourScore.drop();
          await MPFour.drop();
          await sequelize.sync();

          for (let index = 0; index < draw.sportsmansArray.length; index++) {
            await MPFour.create({
              sportsmanId: draw.sportsmansArray[index].id,
              drawsNumber: drawArray[index],
            });
          }

          for (let index = 0; index < draw.sportsmansArray.length; index++) {
            await MPFourScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[0].id,
              scores: scores,
              MPFourId: index + 1,
            });
            await MPFourScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[1].id,
              scores: scores,
              MPFoureId: index + 1,
            });
            await MPFourScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[2].id,
              scores: scores,
              MPFourId: index + 1,
            });
            await MPFourScore.create({
              sportsmanId: draw.sportsmansArray[index].id,
              subgroupFigureId: subgroupFiguresArray[3].id,
              scores: scores,
              MPFourId: index + 1,
            });
          }
          break;

        default:
          break;
      }
    }

    res.json(draw);
  }
}

module.exports = new DrawControll();
