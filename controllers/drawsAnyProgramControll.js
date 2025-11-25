const { Op } = require("sequelize");
const sequelize = require("../db");
const {
  DrawAnyProgram,
  Sportsmans,
  Teams,
  AnyTeamProgram,
  MainAnyProgram,
  MPOneAnyProgram,
  MPOneScoreAnyProgram,
  MPOneScoreIpressionAnyProgram,
  // MPOne,
  // MPTwo,
  // MPThree,
  // MPFour,
  // MPOneScore,
  // MPTwoScore,
  // MPThreeScore,
  // MPFourScore,
  // SubgroupFigures,
  // MainProgram,
  // BrigadeOne,
  // RefereesBrigades,
  // Referees,
  // MainAnyProgram,
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

class DrawAnyProgramControll {
  async saveDraw(req, res) {
    const { draw } = req.body;

    let findDraw;

    findDraw = await DrawAnyProgram.findOne({
      where: { groupId: draw.groupId, disciplineId: draw.disciplineId },
    });
    let drawSave;

    if (draw.disciplineId != 1) {
      if (findDraw) {
        // (findDraw.nameId = draw.nameId),
        (findDraw.drawOne = draw.drawOne),
          (findDraw.drawTwo = draw.drawTwo),
          (findDraw.drawThree = draw.drawThree),
          // (findDraw.sportsmans = draw.sportsmans),
          (drawSave = await findDraw.save());
      } else {
        findDraw = await DrawAnyProgram.create({
          // nameId: draw.nameId,
          drawOne: draw.drawOne,
          drawTwo: draw.drawTwo,
          drawThree: draw.drawThree,
          // sportsmans: draw.sportsmans,
        });
      }

      console.log(findDraw);
      

      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: {
          anyTeamProgram: draw.disciplineId,
          anyTeamProgramYears: draw.groupId,
        },
        include: { model: Teams },
      });

      drawSave.dataValues.teamsArray = [];
      drawSave.teamsArray = [];

      await Promise.all(
        anyTeamPrograms.map(async (anyTeamProgram) => {
          drawSave.dataValues.teamsArray.push(anyTeamProgram);
          drawSave.teamsArray.push(anyTeamProgram);

          let sportsmansArray = await Promise.all(
            anyTeamProgram.sportsmansId.map(async (sportsmanId) => {
              return Sportsmans.findOne({
                where: { id: sportsmanId },
                include: { model: Teams },
              });
            })
          );

          anyTeamProgram.dataValues.sportsmansArray = [...sportsmansArray];
          anyTeamProgram.sportsmansArray = [...sportsmansArray];
        })
      ).then(async () => {
        let arr = Array.from(
          { length: drawSave.teamsArray.length },
          (_, index) => 0
        );

        if (drawSave.drawOne === null) {
          drawSave.drawOne = arr;
        }
        if (drawSave.drawTwo === null) {
          drawSave.drawTwo = arr;
        }
        if (drawSave.drawThree === null) {
          drawSave.drawThree = arr;
        }
      });
    } else {
      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: {
          anyTeamProgram: draw.disciplineId,
          anyTeamProgramYears: draw.groupId,
        },
        include: { model: Teams },
      });

      if (findDraw) {
        // (findDraw.nameId = draw.nameId),
        (findDraw.drawOne = draw.drawOne),
          (findDraw.drawTwo = draw.drawTwo),
          (findDraw.drawThree = draw.drawThree),
          // (findDraw.sportsmans = draw.sportsmans),
          (drawSave = await findDraw.save());
      } else {
        findDraw = await DrawAnyProgram.create({
          // nameId: draw.nameId,
          drawOne: draw.drawOne,
          drawTwo: draw.drawTwo,
          drawThree: draw.drawThree,
          // sportsmans: draw.sportsmans,
        });
      }

      drawSave.dataValues.sportsmansArray = [];
      drawSave.sportsmansArray = [];

      let sportsmans = await Sportsmans.findAll({
        where: { ageGroupId: draw.groupId, mandatoryProgramSolo: true },
        include: { model: Teams },
      });

      let arr = Array.from({ length: sportsmans.length }, (_, index) => 0);

      if (drawSave.drawOne === null) {
        drawSave.drawOne = arr;
      }
      if (drawSave.drawTwo === null) {
        drawSave.drawTwo = arr;
      }
      if (drawSave.drawThree === null) {
        drawSave.drawThree = arr;
      }

      drawSave.dataValues.sportsmansArray = sportsmans;
      drawSave.sportsmansArray = sportsmans;
    }

    await drawSave.save();
    res.json(drawSave);
  }

  async getDraw(req, res) {
    const { nameId, groupId, disciplineId } = req.query;
    let draw;

    console.log(req.query);

    draw = await DrawAnyProgram.findOne({
      where: { groupId: groupId, disciplineId: disciplineId },
    });

    // console.log(draw);

    if (disciplineId != 1) {
      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: { anyTeamProgram: disciplineId, anyTeamProgramYears: groupId },
        include: { model: Teams },
      });

      console.log(anyTeamPrograms);

      draw.dataValues.teamsArray = [];
      draw.teamsArray = [];

      if (anyTeamPrograms) {
        await Promise.all(
          anyTeamPrograms.map(async (anyTeamProgram) => {
            // console.log(anyTeamProgram);

            draw.dataValues.teamsArray.push(anyTeamProgram);
            draw.teamsArray.push(anyTeamProgram);

            anyTeamProgram.dataValues.sportsmansArray = [];
            anyTeamProgram.sportsmansArray = [];

            let sportsmansArray = await Promise.all(
              anyTeamProgram.sportsmansId.map(async (sportsmanId) => {
                return Sportsmans.findOne({
                  where: { id: sportsmanId },
                  include: { model: Teams },
                });
              })
            );

            anyTeamProgram.dataValues.sportsmansArray = [...sportsmansArray];
            anyTeamProgram.sportsmansArray = [...sportsmansArray];
          })
        ).then(async () => {
          let arr = Array.from(
            { length: draw.teamsArray.length },
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
        });
      }
    } else {
      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: { anyTeamProgram: disciplineId, anyTeamProgramYears: groupId },
        include: { model: Teams },
      });

      draw.dataValues.sportsmansArray = [];
      draw.sportsmansArray = [];

      let sportsmans = await Sportsmans.findAll({
        where: { ageGroupId: groupId, mandatoryProgramSolo: true },
        include: { model: Teams },
      });

      let arr = Array.from({ length: sportsmans.length }, (_, index) => 0);

      if (draw.drawOne === null) {
        draw.drawOne = arr;
      }
      if (draw.drawTwo === null) {
        draw.drawTwo = arr;
      }
      if (draw.drawThree === null) {
        draw.drawThree = arr;
      }

      draw.dataValues.sportsmansArray = sportsmans;
      draw.sportsmansArray = sportsmans;
    }

    await draw.save();
    res.json(draw);

    // let sportsmans = await Sportsmans.findAll({
    //   where: { ageSubgroupId: ageSubgroup, [anyProgram]: true },
    //   include: { model: Teams },
    // });

    // if (nameId > 4) {
    //   draw = await Draw.findOne({
    //     where: { id: nameId },
    //   });

    //   let ageSubgroup = AnyProgramFunc(nameId, anyProgramName);

    //   let sportsmans = await Sportsmans.findAll({
    //     where: { ageSubgroupId: ageSubgroup, [anyProgram]: true },
    //     include: { model: Teams },
    //   });

    //   draw.dataValues.sportsmansArray = sportsmans;
    //   draw.sportsmansArray = sportsmans;
    // } else {
    //   draw = await Draw.findOne({
    //     where: { id: ageSubgroupNumber },
    //     include: [
    //       {
    //         model: Sportsmans,
    //         as: "sportsmansArray",
    //         include: { model: Teams },
    //       },
    //     ],
    //   });
    // }

    // let arr = Array.from(
    //   { length: draw.sportsmansArray.length },
    //   (_, index) => 0
    // );

    // if (draw.drawOne === null) {
    //   draw.drawOne = arr;
    // }
    // if (draw.drawTwo === null) {
    //   draw.drawTwo = arr;
    // }
    // if (draw.drawThree === null) {
    //   draw.drawThree = arr;
    // }

    // await draw.save();

    // res.json(draw);
  }

  async resetDraw(req, res) {
    const {
      nameId,
      activeDraw,
      groupId,
      disciplineId,
      anyProgram,
      anyProgramName,
    } = req.body.draw;

    let draw;

    draw = await DrawAnyProgram.findOne({
      where: { groupId: groupId, disciplineId: disciplineId },
    });

    if (disciplineId != 1) {
      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: {
          anyTeamProgram: draw.disciplineId,
          anyTeamProgramYears: draw.groupId,
        },
        include: { model: Teams },
      });

      draw.dataValues.teamsArray = [];
      draw.teamsArray = [];

      await Promise.all(
        anyTeamPrograms.map(async (anyTeamProgram) => {
          draw.dataValues.teamsArray.push(anyTeamProgram);
          draw.teamsArray.push(anyTeamProgram);

          let sportsmansArray = await Promise.all(
            anyTeamProgram.sportsmansId.map(async (sportsmanId) => {
              return Sportsmans.findOne({
                where: { id: sportsmanId },
                include: { model: Teams },
              });
            })
          );

          anyTeamProgram.dataValues.sportsmansArray = [...sportsmansArray];
          anyTeamProgram.sportsmansArray = [...sportsmansArray];
        })
      );

      if (activeDraw == null) {
        draw.drawOne = [];
        draw.drawTwo = [];
        draw.drawThree = [];
        draw.activeDraw = null;

        await MPOneScoreAnyProgram.destroy({
          where: {
            disciplineId: disciplineId,
            groupId: groupId,
          },
        });

        await MPOneAnyProgram.destroy({
          where: {
            disciplineId: disciplineId,
            groupId: groupId,
          },
        });

        await MPOneScoreIpressionAnyProgram.destroy({
          where: {
            disciplineId: disciplineId,
            groupId: groupId,
          },
        });
      } else {
        const anyTeamPrograms = await AnyTeamProgram.findAll({
          where: {
            anyTeamProgram: draw.disciplineId,
            anyTeamProgramYears: draw.groupId,
          },
        });

        let arr = Array.from(
          { length: draw.teamsArray.length },
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
    } else {
      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: {
          anyTeamProgram: draw.disciplineId,
          anyTeamProgramYears: draw.groupId,
        },
        include: { model: Teams },
      });


      draw.dataValues.sportsmansArray = [];
      draw.sportsmansArray = [];

      let sportsmans = await Sportsmans.findAll({
        where: { ageGroupId: draw.groupId, mandatoryProgramSolo: true },
        include: { model: Teams },
      });

      draw.dataValues.sportsmansArray = sportsmans;
      draw.sportsmansArray = sportsmans;

      if (activeDraw == null) {
        draw.drawOne = [];
        draw.drawTwo = [];
        draw.drawThree = [];
        draw.activeDraw = null;

        await MPOneScoreAnyProgram.destroy({
          where: {
            disciplineId: disciplineId,
            groupId: groupId,
          },
        });

        await MPOneAnyProgram.destroy({
          where: {
            disciplineId: disciplineId,
            groupId: groupId,
          },
        });

        await MPOneScoreIpressionAnyProgram.destroy({
          where: {
            disciplineId: disciplineId,
            groupId: groupId,
          },
        });
      } else {
        const anyTeamPrograms = await AnyTeamProgram.findAll({
          where: {
            anyTeamProgram: draw.disciplineId,
            anyTeamProgramYears: draw.groupId,
          },
        });

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
    }

    await draw.save();
    res.json(draw);
  }

  async changeManuallyDraw(req, res) {
    const {
      nameId,
      groupId,
      disciplineId,
      drawChange,
      drawPositionChange,
      drawValueChange,
      anyProgram,
      anyProgramName,
    } = req.body.draw;

    let draw;

    draw = await DrawAnyProgram.findOne({
      where: { groupId: groupId, disciplineId: disciplineId },
    });

    if (disciplineId != 1) {
      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: { anyTeamProgram: disciplineId, anyTeamProgramYears: groupId },
      });

      draw.dataValues.teamsArray = [];
      draw.teamsArray = [];

      await Promise.all(
        anyTeamPrograms.map((anyTeamProgram) => {
          draw.dataValues.teamsArray.push(anyTeamProgram);
          draw.teamsArray.push(anyTeamProgram);
        })
      );

      if (
        draw[`${drawChange}`].includes(drawValueChange) &&
        drawValueChange != 0
      ) {
        return res.json({ draw, message: "Номер не должен повторятся" });
      }

      let array = [...draw[`${drawChange}`]];

      array[drawPositionChange] = drawValueChange;
      draw[`${drawChange}`] = array;
    } else {
      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: { anyTeamProgram: disciplineId, anyTeamProgramYears: groupId },
      });

      draw.dataValues.sportsmansArray = [];
      draw.sportsmansArray = [];

      let sportsmans = await Sportsmans.findAll({
        where: { ageGroupId: draw.groupId, mandatoryProgramSolo: true },
        include: { model: Teams },
      });

      draw.dataValues.sportsmansArray = sportsmans;
      draw.sportsmansArray = sportsmans;

      if (
        draw[`${drawChange}`].includes(drawValueChange) &&
        drawValueChange != 0
      ) {
        return res.json({ draw, message: "Номер не должен повторятся" });
      }

      let array = [...draw[`${drawChange}`]];

      array[drawPositionChange] = drawValueChange;
      draw[`${drawChange}`] = array;
    }

    await draw.save();
    res.json({ draw });
  }

  async activeDraw(req, res) {
    const {
      nameId,
      activeDraw,
      groupId,
      disciplineId,
      anyProgramName,
      anyProgram,
    } = req.body.draw;

    let draw;

    draw = await DrawAnyProgram.findOne({
      where: { groupId: groupId, disciplineId: disciplineId },
    });

    if (disciplineId != 1) {
      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: {
          anyTeamProgram: draw.disciplineId,
          anyTeamProgramYears: draw.groupId,
        },
        include: { model: Teams },
      });

      draw.dataValues.teamsArray = [];
      draw.teamsArray = [];

      if (anyTeamPrograms) {
        await Promise.all(
          anyTeamPrograms.map(async (anyTeamProgram) => {
            draw.dataValues.teamsArray.push(anyTeamProgram);
            draw.teamsArray.push(anyTeamProgram);

            let sportsmansArray = await Promise.all(
              anyTeamProgram.sportsmansId.map(async (sportsmanId) => {
                return Sportsmans.findOne({
                  where: { id: sportsmanId },
                  include: { model: Teams },
                });
              })
            );

            anyTeamProgram.dataValues.sportsmansArray = [...sportsmansArray];
            anyTeamProgram.sportsmansArray = [...sportsmansArray];
          })
        );
      }

      draw.activeDraw = activeDraw;
      await draw.save();

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

      const mainProgram = await MainAnyProgram.findOne({
        where: {
          id: groupId,
        },
      });

      let refereesLength = 5;

      let scores = [];

      for (let index = 0; index < refereesLength; index++) {
        scores.push(0);
      }

      await MPOneScoreAnyProgram.destroy({
        where: {
          disciplineId: disciplineId,
          groupId: groupId,
        },
      });

      await MPOneAnyProgram.destroy({
        where: {
          disciplineId: disciplineId,
          groupId: groupId,
        },
      });

      await MPOneScoreIpressionAnyProgram.destroy({
        where: {
          disciplineId: disciplineId,
          groupId: groupId,
        },
      });

      const MPOneScoreAnyProgramList = [
        {
          groupId: 1,
          disciplineId: 1,
          elemntsCount: 6,
        },
        {
          groupId: 1,
          disciplineId: 2,
          elemntsCount: 8,
        },
        {
          groupId: 1,
          disciplineId: 3,
          elemntsCount: 7,
        },
        {
          groupId: 1,
          disciplineId: 4,
          elemntsCount: 9,
        },
        {
          groupId: 1,
          disciplineId: 5,
          elemntsCount: 7,
        },
        {
          groupId: 2,
          disciplineId: 1,
          elemntsCount: 5,
        },
        {
          groupId: 2,
          disciplineId: 2,
          elemntsCount: 6,
        },
        {
          groupId: 2,
          disciplineId: 3,
          elemntsCount: 5,
        },
        {
          groupId: 2,
          disciplineId: 4,
          elemntsCount: 8,
        },
        {
          groupId: 2,
          disciplineId: 5,
          elemntsCount: 9,
        },
        {
          groupId: 3,
          disciplineId: 1,
          elemntsCount: 4,
        },
        {
          groupId: 3,
          disciplineId: 2,
          elemntsCount: 5,
        },
        {
          groupId: 3,
          disciplineId: 3,
          elemntsCount: 5,
        },
        {
          groupId: 3,
          disciplineId: 4,
          elemntsCount: 7,
        },
        {
          groupId: 3,
          disciplineId: 5,
          elemntsCount: 8,
        },
      ];

      const MPOneScoreAnyProgramItem = MPOneScoreAnyProgramList.find(
        (item) => item.groupId == groupId && item.disciplineId == disciplineId
      );

      console.log(1111111111);

      console.log({ groupId, disciplineId });
      console.log(MPOneScoreAnyProgramItem);

      console.log(draw.teamsArray);

      for (let index = 0; index < draw.teamsArray.length; index++) {
        const oneAnyProgram = await MPOneAnyProgram.create({
          anyTeamProgramId: draw.teamsArray[index].id,
          drawsNumber: drawArray[index],
          disciplineId: disciplineId,
          groupId: groupId,
        });

        for (
          let indexCount = 0;
          indexCount < MPOneScoreAnyProgramItem.elemntsCount;
          indexCount++
        ) {
          await MPOneScoreAnyProgram.create({
            anyTeamProgramId: draw.teamsArray[index].id,
            scores: scores,
            MPOneAnyProgramId: oneAnyProgram.id,
            disciplineId: disciplineId,
            groupId: groupId,
            // MPOneAnyProgramId: oneAnyProgram.id
          });
        }

        await MPOneScoreIpressionAnyProgram.create({
          anyTeamProgramId: draw.teamsArray[index].id,
          scores: scores,
          MPOneAnyProgramId: oneAnyProgram.id,
          disciplineId: disciplineId,
          groupId: groupId,
        });

        await MPOneScoreIpressionAnyProgram.create({
          anyTeamProgramId: draw.teamsArray[index].id,
          scores: scores,
          MPOneAnyProgramId: oneAnyProgram.id,
          disciplineId: disciplineId,
          groupId: groupId,
        });

        await MPOneScoreIpressionAnyProgram.create({
          anyTeamProgramId: draw.teamsArray[index].id,
          scores: scores,
          MPOneAnyProgramId: oneAnyProgram.id,
          disciplineId: disciplineId,
          groupId: groupId,
        });
      }
    } else {
      const anyTeamPrograms = await AnyTeamProgram.findAll({
        where: {
          anyTeamProgram: draw.disciplineId,
          anyTeamProgramYears: draw.groupId,
        },
        include: { model: Teams },
      });

      draw.dataValues.sportsmansArray = [];
      draw.sportsmansArray = [];

      let sportsmans = await Sportsmans.findAll({
        where: { ageGroupId: draw.groupId, mandatoryProgramSolo: true },
        include: { model: Teams },
      });

      draw.dataValues.sportsmansArray = sportsmans;
      draw.sportsmansArray = sportsmans;

      draw.activeDraw = activeDraw;
      await draw.save();

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

      const mainProgram = await MainAnyProgram.findOne({
        where: {
          id: groupId,
        },
      });

      let refereesLength = 5;

      let scores = [];

      for (let index = 0; index < refereesLength; index++) {
        scores.push(0);
      }

      await MPOneScoreAnyProgram.destroy({
        where: {
          disciplineId: disciplineId,
          groupId: groupId,
        },
      });

      await MPOneAnyProgram.destroy({
        where: {
          disciplineId: disciplineId,
          groupId: groupId,
        },
      });

      await MPOneScoreIpressionAnyProgram.destroy({
        where: {
          disciplineId: disciplineId,
          groupId: groupId,
        },
      });

      const MPOneScoreAnyProgramList = [
        {
          groupId: 1,
          disciplineId: 1,
          elemntsCount: 6,
        },
        {
          groupId: 1,
          disciplineId: 2,
          elemntsCount: 8,
        },
        {
          groupId: 1,
          disciplineId: 3,
          elemntsCount: 7,
        },
        {
          groupId: 1,
          disciplineId: 4,
          elemntsCount: 9,
        },
        {
          groupId: 1,
          disciplineId: 5,
          elemntsCount: 7,
        },
        {
          groupId: 2,
          disciplineId: 1,
          elemntsCount: 5,
        },
        {
          groupId: 2,
          disciplineId: 2,
          elemntsCount: 6,
        },
        {
          groupId: 2,
          disciplineId: 3,
          elemntsCount: 5,
        },
        {
          groupId: 2,
          disciplineId: 4,
          elemntsCount: 8,
        },
        {
          groupId: 2,
          disciplineId: 5,
          elemntsCount: 9,
        },
        {
          groupId: 3,
          disciplineId: 1,
          elemntsCount: 4,
        },
        {
          groupId: 3,
          disciplineId: 2,
          elemntsCount: 5,
        },
        {
          groupId: 3,
          disciplineId: 3,
          elemntsCount: 5,
        },
        {
          groupId: 3,
          disciplineId: 4,
          elemntsCount: 7,
        },
        {
          groupId: 3,
          disciplineId: 5,
          elemntsCount: 8,
        },
      ];

      const MPOneScoreAnyProgramItem = MPOneScoreAnyProgramList.find(
        (item) => item.groupId == groupId && item.disciplineId == disciplineId
      );

      for (let index = 0; index < draw.sportsmansArray.length; index++) {
        const oneAnyProgram = await MPOneAnyProgram.create({
          sportsmanId: draw.sportsmansArray[index].id,
          drawsNumber: drawArray[index],
          disciplineId: disciplineId,
          groupId: groupId,
        });

        for (
          let indexCount = 0;
          indexCount < MPOneScoreAnyProgramItem.elemntsCount;
          indexCount++
        ) {
          await MPOneScoreAnyProgram.create({
            sportsmanId: draw.sportsmansArray[index].id,
            scores: scores,
            MPOneAnyProgramId: oneAnyProgram.id,
            disciplineId: disciplineId,
            groupId: groupId,
            // MPOneAnyProgramId: oneAnyProgram.id
          });
        }

        await MPOneScoreIpressionAnyProgram.create({
          sportsmanId: draw.sportsmansArray[index].id,
          scores: scores,
          MPOneAnyProgramId: oneAnyProgram.id,
          disciplineId: disciplineId,
          groupId: groupId,
        });

        await MPOneScoreIpressionAnyProgram.create({
          sportsmanId: draw.sportsmansArray[index].id,
          scores: scores,
          MPOneAnyProgramId: oneAnyProgram.id,
          disciplineId: disciplineId,
          groupId: groupId,
        });

        await MPOneScoreIpressionAnyProgram.create({
          sportsmanId: draw.sportsmansArray[index].id,
          scores: scores,
          MPOneAnyProgramId: oneAnyProgram.id,
          disciplineId: disciplineId,
          groupId: groupId,
        });
      }
    }

    res.json(draw);
  }
}

module.exports = new DrawAnyProgramControll();
