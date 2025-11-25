const { model } = require("../db");
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
  SportCategory,
  Figures,
  MPOneAnyProgram,
  MPOneScoreAnyProgram,
  ElementsProgram,
  ElementsOfTechnicalPrograms,
  MPOneScoreIpressionAnyProgram,
  AnyTeamProgram,
  AgeGroups,
  AgeSubgroup,
  Referees,
} = require("../models/models");

const MPDataScoreFunc = async (MPScore, changeRating) => {
  // console.log(MPScore);

  console.log("***************");

  console.log(changeRating);

  if (!changeRating?.item?.elementsOfTechnicalProgramId) {
    if (changeRating.fine) {
      MPScore[`${changeRating.fine}`] = Number(changeRating.text);
    } else if (changeRating.dd) {
      MPScore.DD = Number(changeRating.text);
    } else {
      let scores = [...MPScore.scores];
      scores[changeRating.field] = Number(changeRating.text);
      MPScore.scores = scores;
    }
  }

  // console.log(changeRating);

  // console.log(MPScore);

  newScores = [...MPScore.scores].sort((a, b) => a - b);
  newScores.shift();
  newScores.pop();

  let element = 1;

  // console.log('77777777777777');

  // console.log(newScores);

  if (MPScore.elementsProgramId != null) {
    console.log(MPScore.elementsProgram);
    element = MPScore.elementsProgram.ratio;
  }

  // console.log("---------------");

  // console.log(element);

  sum = newScores.reduce((currentSum, currentNumber) => {
    return currentSum + currentNumber;
  }, 0);

  if (MPScore.DD) {
    sum =
      Math.round((sum / newScores.length) * element * MPScore.DD * 10000) /
      10000;
  } else {
    sum = Math.round(sum * element * 10000) / 10000;
  }

  // console.log("76767676");

  // console.log(sum);

  MPScore.scoresResult = sum;

  // const fine = MPScore.scoresResult.reduce((currentSum, currentNumber) => {
  //   return currentSum + currentNumber.fine;
  // }, 0);

  await MPScore.save();
};

const funcFiguresResultSportsman = (sportsmans, id) => {
  const sum = sportsmans.reduce((currentSum, currentNumber) => {
    if (currentNumber.sportsman.id == id) {
      return currentSum + currentNumber.scoresResultFinishThree;
    }
    return currentSum + 0;
  }, 0);

  return sum;
};

const MPDataScoreFinalsFunc = async (
  Table,
  TableName,
  TableNameImpression,
  groupId,
  disciplineId
) => {
  let MPData = await Table.findAll({
    where: {
      groupId: groupId,
      disciplineId: disciplineId,
    },
    order: [
      ["drawsNumber", "ASC"],
      [
        { model: TableName, as: "MPScoreAnyProgramArray" },
        "elementsProgramId",
        "ASC",
      ],
      [
        { model: TableNameImpression, as: "MPOneScoreIpressionAnyArray" },
        "elementsProgramId",
        "ASC",
      ],
    ],
    include: [
      {
        model: TableName,
        as: "MPScoreAnyProgramArray",
        include: {
          model: ElementsProgram,
        },
      },
      {
        model: TableNameImpression,
        as: "MPOneScoreIpressionAnyArray",
        include: { model: ElementsProgram },
      },
      {
        model: AnyTeamProgram,
        include: [{ model: Teams }],
      },
    ],
  });

  MPData.map(async (MPDataItem) => {
    const fine = MPDataItem.MPScoreAnyProgramArray.reduce(
      (currentSum, currentNumber) => {
        return currentSum + currentNumber.fine;
      },
      0
    );

    const score = MPDataItem.MPScoreAnyProgramArray.reduce(
      (currentSum, currentNumber) => {
        return currentSum + currentNumber.scoresResult;
      },
      0
    );

    const finalDD = MPDataItem.MPScoreAnyProgramArray.reduce(
      (currentSum, currentNumber) => {
        return currentSum + currentNumber.DD;
      },
      0
    );

    const scoreImpression = MPDataItem.MPOneScoreIpressionAnyArray.reduce(
      (currentSum, currentNumber) => {
        return currentSum + currentNumber.scoresResult;
      },
      0
    );

    // let element = 1;

    // console.log(MPDataItem);

    // console.log('*****************');

    // console.log(sum);
    // console.log(fine);
    // console.log(MPDataItem.sinxr);

    const scoresResultFinishElements = score - fine - MPDataItem.sinxr;

    const scoresResultFinishImpression = scoreImpression;

    const finishTwo = scoresResultFinishElements + scoresResultFinishImpression;
    // console.log(finishTwo);

    //посчитать impression
    // const finishThree = finishTwo;

    MPDataItem.scoresResultFinishElements = scoresResultFinishElements;
    MPDataItem.scoresResultFinishImpression = scoresResultFinishImpression;
    MPDataItem.scoresResultFinishOne = fine;
    MPDataItem.scoresResultFinishTwo = finishTwo;
    // MPDataItem.scoresResultFinishThree = finishThree;
    MPDataItem.finalDD = finalDD;

    // console.log(MPDataItem);
    // TableName.scoresResultFinishThree = fine;

    await MPDataItem.save();
  });
};

class RatingsAnyProgramControll {
  async getRatings(req, res) {
    const { groupId, disciplineId } = req.query;

    let MPData;

    try {
      if (disciplineId != 1) {
        MPData = await MPOneAnyProgram.findAll({
          where: {
            groupId: groupId,
            disciplineId: disciplineId,
          },
          order: [
            ["drawsNumber", "ASC"],
            [
              { model: MPOneScoreAnyProgram, as: "MPScoreAnyProgramArray" },
              "id",
              "ASC",
            ],
            [
              {
                model: MPOneScoreIpressionAnyProgram,
                as: "MPOneScoreIpressionAnyArray",
              },
              "id",
              "ASC",
            ],
          ],
          include: [
            {
              model: MPOneScoreAnyProgram,
              as: "MPScoreAnyProgramArray",
              include: { model: ElementsProgram },
            },
            {
              model: MPOneScoreIpressionAnyProgram,
              as: "MPOneScoreIpressionAnyArray",
              include: { model: ElementsProgram },
            },
            {
              model: AnyTeamProgram,
              include: [{ model: Teams }],
            },
          ],
        });

        await Promise.all(
          MPData.map(async (MPDataItem) => {
            let sportsmansArray = await Promise.all(
              MPDataItem.anyTeamProgram.sportsmansId.map(
                async (sportsmanId) => {
                  return Sportsmans.findOne({
                    where: { id: sportsmanId },
                    include: [
                      {
                        model: AgeGroups,
                      },
                      {
                        model: AgeSubgroup,
                      },
                      {
                        model: Referees,
                      },
                      {
                        model: SportCategory,
                      },
                      {
                        model: Teams,
                      },
                    ],
                  });
                }
              )
            );

            // console.log(sportsmansArray);

            MPDataItem.anyTeamProgram.dataValues.sportsmansArray = [
              ...sportsmansArray,
            ];

            MPDataItem.anyTeamProgram.sportsmansArray = [...sportsmansArray];
          })
        );

        MPData.forEach(async (item) => {
          item.scoresResultFinishThree = item.scoresResultFinishTwo;

          await item.save();
        });

        // console.log(11111111);
        // console.log(MPData);

        if (MPData[0] && !MPData[0].anyTeamProgramId) {
          await MPOne.destroy({ where: { id: MPData[0].id } });
          return res.json({ error: "Ошибка" });
        }
      } else {
        MPData = await MPOneAnyProgram.findAll({
          where: {
            groupId: groupId,
            disciplineId: disciplineId,
          },
          order: [
            ["drawsNumber", "ASC"],
            [
              { model: MPOneScoreAnyProgram, as: "MPScoreAnyProgramArray" },
              "id",
              "ASC",
            ],
            [
              {
                model: MPOneScoreIpressionAnyProgram,
                as: "MPOneScoreIpressionAnyArray",
              },
              "id",
              "ASC",
            ],
          ],
          include: [
            {
              model: MPOneScoreAnyProgram,
              as: "MPScoreAnyProgramArray",
              include: { model: ElementsProgram },
            },
            {
              model: MPOneScoreIpressionAnyProgram,
              as: "MPOneScoreIpressionAnyArray",
              include: { model: ElementsProgram },
            },
            {
              model: Sportsmans,
              include: [
                {
                  model: AgeGroups,
                },
                {
                  model: AgeSubgroup,
                },
                {
                  model: Referees,
                },
                {
                  model: SportCategory,
                },
                {
                  model: Teams,
                },
              ],
            },
          ],
        });

        let mpScore;

        switch (Number(groupId == 2 ? 1 : 2)) {
          case 1:
            try {
              mpScore = await MPOne.findAll();
            } catch (error) {
              return res.json({ error: "Ошибка" });
            }

            break;

          case 2:
            try {
              mpScore = await MPTwo.findAll();
            } catch (error) {
              return res.json({ error: "Ошибка" });
            }
            break;
          default:
            break;
        }

        MPData.forEach(async (item) => {
          const findScore = mpScore.find(
            (mpScoreItem) => mpScoreItem.sportsmanId == item.sportsmanId
          );
          item.scoresResultFinishFigures = findScore.scoresResultFinishThree;
          item.scoresResultFinishThree =
            findScore.scoresResultFinishThree + item.scoresResultFinishTwo;

          await item.save();
        });

        if (MPData[0] && !MPData[0].sportsmanId) {
          await MPOne.destroy({ where: { id: MPData[0].id } });
          return res.json({ error: "Ошибка" });
        }
      }
    } catch (error) {
      return res.json({ error: "Ошибка" });
    }

    return res.json(MPData);
  }

  async saveActiveRatings(req, res) {
    const { nameId, changeRating, groupId, disciplineId } = req.body.data;

    let MPData;
    let MPDataScore;
    let newScores;
    let sum;

    // console.log(changeRating);

    MPDataScore = await MPOneScoreAnyProgram.findOne({
      where: {
        id: changeRating.id,
        groupId: groupId,
        disciplineId: disciplineId,
      },
      include: {
        model: ElementsProgram,
      },
    });

    MPData = await MPOneAnyProgram.findAll({
      where: {
        groupId: groupId,
        disciplineId: disciplineId,
      },
      order: [
        ["drawsNumber", "ASC"],
        [
          { model: MPOneScoreAnyProgram, as: "MPScoreAnyProgramArray" },
          "id",
          "ASC",
        ],
        [
          {
            model: MPOneScoreIpressionAnyProgram,
            as: "MPOneScoreIpressionAnyArray",
          },
          "id",
          "ASC",
        ],
      ],
      include: [
        {
          model: MPOneScoreAnyProgram,
          as: "MPScoreAnyProgramArray",
          include: { model: ElementsProgram },
        },
        {
          model: MPOneScoreIpressionAnyProgram,
          as: "MPOneScoreIpressionAnyArray",
          include: { model: ElementsProgram },
        },
        {
          model: AnyTeamProgram,
          include: [{ model: Teams }],
        },
      ],
    });

    await MPDataScoreFunc(MPDataScore, changeRating);
    await MPDataScoreFinalsFunc(
      MPOneAnyProgram,
      MPOneScoreAnyProgram,
      MPOneScoreIpressionAnyProgram,
      groupId,
      disciplineId
    );
    return res.json("123");
  }

  async saveActiveDD(req, res) {
    const { nameId, changeRating, groupId, disciplineId } = req.body.data;

    let MPData;
    let MPDataScore;
    let newScores;
    let sum;

    // console.log(changeRating);

    MPDataScore = await MPOneScoreAnyProgram.findOne({
      where: {
        id: changeRating.id,
        groupId: groupId,
        disciplineId: disciplineId,
      },
      include: {
        model: ElementsProgram,
      },
    });

    MPData = await MPOneAnyProgram.findAll({
      where: {
        groupId: groupId,
        disciplineId: disciplineId,
      },
      order: [
        ["drawsNumber", "ASC"],
        [
          { model: MPOneScoreAnyProgram, as: "MPScoreAnyProgramArray" },
          "id",
          "ASC",
        ],
        [
          {
            model: MPOneScoreIpressionAnyProgram,
            as: "MPOneScoreIpressionAnyArray",
          },
          "id",
          "ASC",
        ],
      ],
      include: [
        {
          model: MPOneScoreAnyProgram,
          as: "MPScoreAnyProgramArray",
          include: { model: ElementsProgram },
        },
        {
          model: MPOneScoreIpressionAnyProgram,
          as: "MPOneScoreIpressionAnyArray",
          include: { model: ElementsProgram },
        },
        {
          model: AnyTeamProgram,
          include: [{ model: Teams }],
        },
      ],
    });

    await MPDataScoreFunc(MPDataScore, changeRating);
    await MPDataScoreFinalsFunc(
      MPOneAnyProgram,
      MPOneScoreAnyProgram,
      MPOneScoreIpressionAnyProgram,
      groupId,
      disciplineId
    );

    // switch (Number(nameId)) {
    //   case 1:
    //     MPDataScore = await MPOneScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPOne.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPOneScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPOneScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPOne, MPOneScore);
    //     break;

    //   case 2:
    //     MPDataScore = await MPTwoScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPTwo.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPTwoScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPTwoScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPTwo, MPTwoScore);
    //     break;

    //   case 3:
    //     MPDataScore = await MPThreeScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPThree.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPThreeScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPThreeScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPThree, MPThreeScore);
    //     break;

    //   case 4:
    //     MPDataScore = await MPFourScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPFour.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPFourScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPFourScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPFour, MPFourScore);
    //     break;

    //   default:
    //     break;
    // }

    // return res.json(MPData);
    return res.json("123");
  }

  async saveActivSinxr(req, res) {
    const { nameId, changeRating, groupId, disciplineId } = req.body.data;

    let MPData;
    let MPDataScore;
    let newScores;
    let sum;

    MPDataScore = await MPOneScoreAnyProgram.findOne({
      where: {
        id: changeRating.id,
        groupId: groupId,
        disciplineId: disciplineId,
      },
      include: {
        model: ElementsProgram,
      },
    });

    MPData = await MPOneAnyProgram.findOne({
      where: {
        id: changeRating.id,
        groupId: groupId,
        disciplineId: disciplineId,
      },
      order: [
        ["drawsNumber", "ASC"],
        [
          { model: MPOneScoreAnyProgram, as: "MPScoreAnyProgramArray" },
          "id",
          "ASC",
        ],
        [
          {
            model: MPOneScoreIpressionAnyProgram,
            as: "MPOneScoreIpressionAnyArray",
          },
          "id",
          "ASC",
        ],
      ],
      include: [
        {
          model: MPOneScoreAnyProgram,
          as: "MPScoreAnyProgramArray",
          include: { model: ElementsProgram },
        },
        {
          model: MPOneScoreIpressionAnyProgram,
          as: "MPOneScoreIpressionAnyArray",
          include: { model: ElementsProgram },
        },
        {
          model: AnyTeamProgram,
          include: [{ model: Teams }],
        },
      ],
    });

    // await MPDataScoreSinxrFunc(MPData, changeRating);

    MPData.sinxr = Number(changeRating.text);
    await MPData.save();

    await MPDataScoreFinalsFunc(
      MPOneAnyProgram,
      MPOneScoreAnyProgram,
      MPOneScoreIpressionAnyProgram,
      groupId,
      disciplineId
    );

    // switch (Number(nameId)) {
    //   case 1:
    //     MPDataScore = await MPOneScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPOne.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPOneScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPOneScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPOne, MPOneScore);
    //     break;

    //   case 2:
    //     MPDataScore = await MPTwoScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPTwo.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPTwoScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPTwoScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPTwo, MPTwoScore);
    //     break;

    //   case 3:
    //     MPDataScore = await MPThreeScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPThree.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPThreeScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPThreeScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPThree, MPThreeScore);
    //     break;

    //   case 4:
    //     MPDataScore = await MPFourScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPFour.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPFourScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPFourScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPFour, MPFourScore);
    //     break;

    //   default:
    //     break;
    // }

    // return res.json(MPData);
    return res.json("123");
  }

  async saveActiveRatingsElement(req, res) {
    const { nameId, changeRating, groupId, disciplineId } = req.body.data;

    let MPData;
    let MPDataScore;
    let newScores;
    let sum;

    MPDataScore = await MPOneScoreAnyProgram.findOne({
      where: {
        id: changeRating.id,
        groupId: groupId,
        disciplineId: disciplineId,
      },
      include: {
        model: ElementsProgram,
      },
    });

    // const elementTechnical = await ElementsOfTechnicalPrograms.findAll({
    //   where: {
    //     groupId: groupId,
    //   },
    //   order: [["id", "ASC"]],
    // })

    // const elementProgram = await ElementsProgram.findOne({
    //   order: [["createdAt", "ASC"]],
    //   where: {elementsOfTechnicalProgramId: elementTechnical[disciplineId - 1].id}
    // });

    MPDataScore.elementsProgramId = changeRating.item.id;
    const newMPDataScore = await MPDataScore.save();

    const newMPDataScoreFind = await MPOneScoreAnyProgram.findOne({
      where: {
        id: newMPDataScore.id,
      },
      include: {
        model: ElementsProgram,
      },
    });

    await MPDataScoreFunc(newMPDataScoreFind, changeRating);
    await MPDataScoreFinalsFunc(
      MPOneAnyProgram,
      MPOneScoreAnyProgram,
      MPOneScoreIpressionAnyProgram,
      groupId,
      disciplineId
    );

    return res.json("123");
  }

  async saveActiveRatingsImpression(req, res) {
    // const { nameId } = req.params;
    const { nameId, changeRating, groupId, disciplineId } = req.body.data;

    let MPData;
    let MPDataScore;
    let newScores;
    let sum;

    // console.log(changeRating);

    MPDataScore = await MPOneScoreIpressionAnyProgram.findOne({
      where: {
        id: changeRating.id,
        groupId: groupId,
        disciplineId: disciplineId,
      },
      include: {
        model: ElementsProgram,
      },
    });

    MPData = await MPOneAnyProgram.findAll({
      where: {
        groupId: groupId,
        disciplineId: disciplineId,
      },
      order: [
        ["drawsNumber", "ASC"],
        [
          { model: MPOneScoreAnyProgram, as: "MPScoreAnyProgramArray" },
          "id",
          "ASC",
        ],
      ],
      include: [
        {
          model: MPOneScoreAnyProgram,
          as: "MPScoreAnyProgramArray",
          include: { model: ElementsProgram },
        },
        {
          model: MPOneScoreIpressionAnyProgram,
          as: "MPOneScoreIpressionAnyArray",
          include: { model: ElementsProgram },
        },
        {
          model: AnyTeamProgram,
          include: [{ model: Teams }],
        },
      ],
    });

    await MPDataScoreFunc(MPDataScore, changeRating);
    await MPDataScoreFinalsFunc(
      MPOneAnyProgram,
      MPOneScoreAnyProgram,
      MPOneScoreIpressionAnyProgram,
      groupId,
      disciplineId
    );

    // switch (Number(nameId)) {
    //   case 1:
    //     MPDataScore = await MPOneScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPOne.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPOneScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPOneScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPOne, MPOneScore);
    //     break;

    //   case 2:
    //     MPDataScore = await MPTwoScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPTwo.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPTwoScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPTwoScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPTwo, MPTwoScore);
    //     break;

    //   case 3:
    //     MPDataScore = await MPThreeScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPThree.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPThreeScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPThreeScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPThree, MPThreeScore);
    //     break;

    //   case 4:
    //     MPDataScore = await MPFourScore.findOne({
    //       where: {
    //         id: changeRating.id,
    //       },
    //       include: {
    //         model: SubgroupFigures,
    //         include: { model: Figures },
    //       },
    //     });

    //     MPData = await MPFour.findAll({
    //       order: [
    //         ["drawsNumber", "ASC"],
    //         [
    //           { model: MPFourScore, as: "MPScoreArray" },
    //           "subgroupFigureId",
    //           "ASC",
    //         ],
    //       ],
    //       include: [
    //         {
    //           model: MPFourScore,
    //           as: "MPScoreArray",
    //           include: { model: SubgroupFigures },
    //         },
    //         {
    //           model: Sportsmans,
    //           include: [{ model: Teams }, { model: SportCategory }],
    //         },
    //       ],
    //     });

    //     await MPDataScoreFunc(MPDataScore, changeRating);
    //     await MPDataScoreFinalsFunc(MPFour, MPFourScore);
    //     break;

    //   default:
    //     break;
    // }

    // return res.json(MPData);
    return res.json("123");
  }

  async saveActiveRatingsElementImpression(req, res) {
    const { nameId, changeRating, groupId, disciplineId } = req.body.data;

    let MPData;
    let MPDataScore;
    let newScores;
    let sum;

    MPDataScore = await MPOneScoreIpressionAnyProgram.findOne({
      where: {
        id: changeRating.id,
        groupId: groupId,
        disciplineId: disciplineId,
      },
      include: {
        model: ElementsProgram,
      },
    });

    // const elementTechnical = await ElementsOfTechnicalPrograms.findAll({
    //   where: {
    //     groupId: groupId,
    //   },
    //   order: [["id", "ASC"]],
    // })

    // const elementProgram = await ElementsProgram.findOne({
    //   order: [["createdAt", "ASC"]],
    //   where: {elementsOfTechnicalProgramId: elementTechnical[disciplineId - 1].id}
    // });

    MPDataScore.elementsProgramId = changeRating.item.id;
    // await MPDataScore.save();

    const newMPDataScore = await MPDataScore.save();

    console.log(newMPDataScore);

    const newMPDataScoreFind = await MPOneScoreIpressionAnyProgram.findOne({
      where: {
        id: newMPDataScore.id,
      },
      include: {
        model: ElementsProgram,
      },
    });

    await MPDataScoreFunc(newMPDataScoreFind, changeRating);
    await MPDataScoreFinalsFunc(
      MPOneAnyProgram,
      MPOneScoreAnyProgram,
      MPOneScoreIpressionAnyProgram,
      groupId,
      disciplineId
    );

    return res.json("123");
  }
}

module.exports = new RatingsAnyProgramControll();
