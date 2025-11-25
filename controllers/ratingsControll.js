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
} = require("../models/models");

const MPDataScoreFunc = async (MPScore, changeRating) => {
  if (changeRating.fine) {
    MPScore[`${changeRating.fine}`] = Number(changeRating.text);
  } else {
    let scores = [...MPScore.scores];

    scores[changeRating.field] = Number(changeRating.text);

    MPScore.scores = scores;
  }

  newScores = [...MPScore.scores].sort((a, b) => a - b);
  newScores.shift();
  newScores.pop();

  console.log(newScores);

  sum = newScores.reduce((currentSum, currentNumber) => {
    return currentSum + currentNumber;
  }, 0);

  sum =
    Math.round(
      (sum / newScores.length) * MPScore.subgroupFigure.figure.ratio * 10000
    ) / 10000;

  MPScore.scoresResult = sum;

  // const fine = MPScore.scoresResult.reduce((currentSum, currentNumber) => {
  //   return currentSum + currentNumber.fine;
  // }, 0);

  await MPScore.save();
};

const MPDataScoreFinalsFunc = async (Table, TableName) => {
  let MPData = await Table.findAll({
    order: [
      ["drawsNumber", "ASC"],
      [{ model: TableName, as: "MPScoreArray" }, "subgroupFigureId", "ASC"],
    ],
    include: [
      {
        model: TableName,
        as: "MPScoreArray",
        include: {
          model: SubgroupFigures,
          include: { model: Figures },
        },
      },
      {
        model: Sportsmans,
        include: [{ model: Teams }, { model: SportCategory }],
      },
    ],
  });

  MPData.map(async (MPDataItem) => {
    const fine = MPDataItem.MPScoreArray.reduce((currentSum, currentNumber) => {
      return currentSum + currentNumber.fine;
    }, 0);

    const score = MPDataItem.MPScoreArray.reduce(
      (currentSum, currentNumber) => {
        return currentSum + currentNumber.scoresResult;
      },
      0
    );

    let sum = score;

    let figure = MPDataItem.MPScoreArray.reduce((currentSum, currentNumber) => {
      return currentSum + currentNumber.subgroupFigure.figure.ratio;
    }, 0);

    const finishTwo = Math.round(((sum - fine) / figure) * 100000) / 10000;

    MPDataItem.scoresResultFinishOne = fine;
    MPDataItem.scoresResultFinishTwo = score;
    MPDataItem.scoresResultFinishThree = finishTwo;
    // TableName.scoresResultFinishThree = fine;

    await MPDataItem.save();
  });
};

class RatingsControll {
  async getRatings(req, res) {
    const { nameId } = req.params;
    let MPData;

    switch (Number(nameId)) {
      case 1:
        try {
          MPData = await MPOne.findAll({
            order: [
              ["drawsNumber", "ASC"],
              [
                { model: MPOneScore, as: "MPScoreArray" },
                "subgroupFigureId",
                "ASC",
              ],
            ],
            include: [
              {
                model: MPOneScore,
                as: "MPScoreArray",
                include: {
                  model: SubgroupFigures,
                  include: { model: Figures },
                },
              },
              {
                model: Sportsmans,
                where: {
                  requiredProgramm: true,
                },
                include: [{ model: Teams }, { model: SportCategory }],
              },
            ],
          });
        } catch (error) {
          return res.json({ error: "Ошибка" });
        }

        if (MPData[0] && !MPData[0].sportsmanId) {
          await MPOne.destroy({ where: { id: MPData[0].id } });
          return res.json({ error: "Ошибка" });
        }

        break;

      case 2:
        try {
          MPData = await MPTwo.findAll({
            order: [
              ["drawsNumber", "ASC"],
              [
                { model: MPTwoScore, as: "MPScoreArray" },
                "subgroupFigureId",
                "ASC",
              ],
            ],
            include: [
              {
                model: MPTwoScore,
                as: "MPScoreArray",
                include: {
                  model: SubgroupFigures,
                  include: { model: Figures },
                },
              },
              {
                model: Sportsmans,
                where: {
                  requiredProgramm: true,
                },
                include: [{ model: Teams }, { model: SportCategory }],
              },
            ],
          });

          if (MPData[0] && !MPData[0]?.sportsmanId) {
            await MPTwo.destroy({ where: { id: MPData[0].id } });
            return res.json({ error: "Ошибка" });
          }
        } catch (error) {
          return res.json({ error: "Ошибка" });
        }
        break;

      case 3:
        try {
          MPData = await MPThree.findAll({
            order: [
              ["drawsNumber", "ASC"],
              [
                { model: MPThreeScore, as: "MPScoreArray" },
                "subgroupFigureId",
                "ASC",
              ],
            ],
            include: [
              {
                model: MPThreeScore,
                as: "MPScoreArray",
                include: {
                  model: SubgroupFigures,
                  include: { model: Figures },
                },
              },
              {
                model: Sportsmans,
                where: {
                  requiredProgramm: true,
                },
                include: [{ model: Teams }, { model: SportCategory }],
              },
            ],
          });

          if (MPData[0] && !MPData[0]?.sportsmanId) {
            await MPThree.destroy({ where: { id: MPData[0].id } });
            return res.json({ error: "Ошибка" });
          }
        } catch (error) {
          return res.json({ error: "Ошибка" });
        }

        break;

      case 4:
        try {
          MPData = await MPFour.findAll({
            order: [
              ["drawsNumber", "ASC"],
              [
                { model: MPFourScore, as: "MPScoreArray" },
                "subgroupFigureId",
                "ASC",
              ],
            ],
            include: [
              {
                model: MPFourScore,
                as: "MPScoreArray",
                include: {
                  model: SubgroupFigures,
                  include: { model: Figures },
                },
              },
              {
                model: Sportsmans,
                where: {
                  requiredProgramm: true,
                },
                include: [{ model: Teams }, { model: SportCategory }],
              },
            ],
          });

          if (MPData[0] && !MPData[0]?.sportsmanId) {
            await MPFour.destroy({ where: { id: MPData[0].id } });
            return res.json({ error: "Ошибка" });
          }
        } catch (error) {
          return res.json({ error: "Ошибка" });
        }

        break;

      default:
        break;
    }

    return res.json(MPData);
  }

  async saveActiveRatings(req, res) {
    // const { nameId } = req.params;
    const { nameId, changeRating } = req.body.data;

    let MPData;
    let MPDataScore;
    let newScores;
    let sum;

    // console.log(changeRating);

    switch (Number(nameId)) {
      case 1:
        MPDataScore = await MPOneScore.findOne({
          where: {
            id: changeRating.id,
          },
          include: {
            model: SubgroupFigures,
            include: { model: Figures },
          },
        });

        MPData = await MPOne.findAll({
          order: [
            ["drawsNumber", "ASC"],
            [
              { model: MPOneScore, as: "MPScoreArray" },
              "subgroupFigureId",
              "ASC",
            ],
          ],
          include: [
            {
              model: MPOneScore,
              as: "MPScoreArray",
              include: { model: SubgroupFigures },
            },
            {
              model: Sportsmans,
              include: [{ model: Teams }, { model: SportCategory }],
            },
          ],
        });

        const newMPDataScoreOne = await MPDataScore.save();

        const newMPDataScoreFindOne = await MPOneScore.findOne({
          where: {
            id: newMPDataScoreOne.id,
          },
          include: {
            model: SubgroupFigures,
            include: { model: Figures },
          },
        });

        await MPDataScoreFunc(newMPDataScoreFindOne, changeRating);
        await MPDataScoreFinalsFunc(MPOne, MPOneScore);
        break;

      case 2:
        MPDataScore = await MPTwoScore.findOne({
          where: {
            id: changeRating.id,
          },
          include: {
            model: SubgroupFigures,
            include: { model: Figures },
          },
        });

        MPData = await MPTwo.findAll({
          order: [
            ["drawsNumber", "ASC"],
            [
              { model: MPTwoScore, as: "MPScoreArray" },
              "subgroupFigureId",
              "ASC",
            ],
          ],
          include: [
            {
              model: MPTwoScore,
              as: "MPScoreArray",
              include: { model: SubgroupFigures },
            },
            {
              model: Sportsmans,
              include: [{ model: Teams }, { model: SportCategory }],
            },
          ],
        });

        const newMPDataScoreTwo = await MPDataScore.save();

        const newMPDataScoreFindTwo = await MPTwoScore.findOne({
          where: {
            id: newMPDataScoreTwo.id,
          },
          include: {
            model: SubgroupFigures,
            include: { model: Figures },
          },
        });

        await MPDataScoreFunc(newMPDataScoreFindTwo, changeRating);
        await MPDataScoreFinalsFunc(MPTwo, MPTwoScore);
        break;

      case 3:
        MPDataScore = await MPThreeScore.findOne({
          where: {
            id: changeRating.id,
          },
          include: {
            model: SubgroupFigures,
            include: { model: Figures },
          },
        });

        MPData = await MPThree.findAll({
          order: [
            ["drawsNumber", "ASC"],
            [
              { model: MPThreeScore, as: "MPScoreArray" },
              "subgroupFigureId",
              "ASC",
            ],
          ],
          include: [
            {
              model: MPThreeScore,
              as: "MPScoreArray",
              include: { model: SubgroupFigures },
            },
            {
              model: Sportsmans,
              include: [{ model: Teams }, { model: SportCategory }],
            },
          ],
        });

        const newMPDataScoreThree = await MPDataScore.save();

        const newMPDataScoreFindThree = await MPThreeScore.findOne({
          where: {
            id: newMPDataScoreThree.id,
          },
          include: {
            model: SubgroupFigures,
            include: { model: Figures },
          },
        });

        await MPDataScoreFunc(newMPDataScoreFindThree, changeRating);
        await MPDataScoreFinalsFunc(MPThree, MPThreeScore);
        break;

      case 4:
        MPDataScore = await MPFourScore.findOne({
          where: {
            id: changeRating.id,
          },
          include: {
            model: SubgroupFigures,
            include: { model: Figures },
          },
        });

        MPData = await MPFour.findAll({
          order: [
            ["drawsNumber", "ASC"],
            [
              { model: MPFourScore, as: "MPScoreArray" },
              "subgroupFigureId",
              "ASC",
            ],
          ],
          include: [
            {
              model: MPFourScore,
              as: "MPScoreArray",
              include: { model: SubgroupFigures },
            },
            {
              model: Sportsmans,
              include: [{ model: Teams }, { model: SportCategory }],
            },
          ],
        });

        const newMPDataScoreFour = await MPDataScore.save();

        const newMPDataScoreFindFour = await MPFourScore.findOne({
          where: {
            id: newMPDataScoreFour.id,
          },
          include: {
            model: SubgroupFigures,
            include: { model: Figures },
          },
        });

        await MPDataScoreFunc(newMPDataScoreFindFour, changeRating);
        await MPDataScoreFinalsFunc(MPFour, MPFourScore);
        break;

      default:
        break;
    }

    // return res.json(MPData);
    return res.json("123");
  }
}

module.exports = new RatingsControll();
