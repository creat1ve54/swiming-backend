const { Op } = require("sequelize");
const {
  AnyTeamProgram,
  Teams,
  Sportsmans,
  SportCategory,
  AgeGroups,
  AgeSubgroup,
  Referees,
} = require("../models/models");

class AnyTeamProgramControll {
  async createAnyTeamProgram(req, res) {
    const { anyTeamProgram, anyTeamProgramYears } = req.body.anyTeamProgram;
    const anyTeamProgramsCreate = await AnyTeamProgram.create({
      anyTeamProgram,
      anyTeamProgramYears,
    });

    res.json("Создалось");
  }
  async createAnyTeamProgramSportsman(req, res) {
    const anyTeamProgramId = req.body.anyTeamProgram;

    const anyTeamProgramsOne = await AnyTeamProgram.findOne({
      where: { id: anyTeamProgramId },
    });

    anyTeamProgramsOne.sportsmansId = [...anyTeamProgramsOne.sportsmansId, 0];
    anyTeamProgramsOne.outOfCompetitions = [
      ...anyTeamProgramsOne.outOfCompetitions,
      false,
    ];

    await anyTeamProgramsOne.save();

    res.json("Создалось");
  }
  async deleteAnyTeamProgramSportsman(req, res) {
    const { programId, spotsmanIndex } = req.query;

    const anyTeamPrograms = await AnyTeamProgram.findOne({
      where: { id: programId },
    });

    let newArray = [...anyTeamPrograms.sportsmansId];

    newArray.splice(spotsmanIndex, 1);
    anyTeamPrograms.sportsmansId = newArray;

    let newArrayoutOfCompetition = [...anyTeamPrograms.outOfCompetitions];

    newArrayoutOfCompetition.splice(spotsmanIndex, 1);
    anyTeamPrograms.outOfCompetitions = newArrayoutOfCompetition;

    await anyTeamPrograms.save();
    res.json("Спортсмен удален!");
  }
  async deleteAnyTeamProgramTeams(req, res) {
    const { id } = req.params;
    await AnyTeamProgram.destroy({ where: { id: id } });
    res.json("Команда удалена!");
  }

  async getAnyTeamProgramTeams(req, res) {
    const { anyTeamProgramYears, anyTeamProgram } = req.query;

    console.log(anyTeamProgramYears);

    try {
      let teams;
      console.log(anyTeamProgramYears);

      if (anyTeamProgramYears == 3) {
        teams = await Teams.findAll({
          order: [["createdAt", "ASC"]],
          include: [
            {
              model: Sportsmans,
              as: "sportsmansArray",
              where: {
                [Op.or]: [
                  { ageSubgroupId: anyTeamProgramYears },
                  { ageSubgroupId: 4 },
                ],
              },
              include: [
                {
                  model: SportCategory,
                },
                {
                  model: AgeGroups,
                },
                {
                  model: AgeSubgroup,
                },
                {
                  model: Referees,
                },
              ],
            },
          ],
        });

        console.log(44444444);

        console.log(teams);
      } else {
        teams = await Teams.findAll({
          order: [["createdAt", "ASC"]],
          include: [
            {
              model: Sportsmans,
              as: "sportsmansArray",
              where: {
                ageSubgroupId: anyTeamProgramYears,
              },
              include: [
                {
                  model: SportCategory,
                },
                {
                  model: AgeGroups,
                },
                {
                  model: AgeSubgroup,
                },
                {
                  model: Referees,
                },
              ],
            },
          ],
        });
      }

      console.log(teams);

      res.json(teams);
    } catch (error) {
      console.log(error);
    }
  }
  async getAnyTeamProgram(req, res) {
    const { anyTeamProgram, anyTeamProgramYears } = req.query;

    const anyTeamProgramsOne = await AnyTeamProgram.findAll({
      where: {
        anyTeamProgram: anyTeamProgram,
        anyTeamProgramYears: anyTeamProgramYears,
      },
      order: [["id", "ASC"]],
    });

    let anyTeamPrograms = null;

    if (anyTeamProgramsOne) {
      const promises = anyTeamProgramsOne.map(async (program, index) => {
        let anyTeamPrograms;
        if (anyTeamProgramYears == 3 && anyTeamProgram == 5) {
          anyTeamPrograms = await AnyTeamProgram.findAll({
            where: {
              anyTeamProgram: anyTeamProgram,
              anyTeamProgramYears: anyTeamProgramYears,
            },
            order: [["id", "ASC"]],
            include: [
              {
                model: Teams,
                order: [["createdAt", "ASC"]],
                include: [
                  {
                    model: Sportsmans,
                    as: "sportsmansArray",
                    required: false,
                    where: {
                      [Op.or]: [
                        { ageSubgroupId: anyTeamProgramYears },
                        { ageSubgroupId: 4 },
                      ],
                      id: { [Op.not]: program.sportsmansId },
                    },
                    include: [
                      { model: SportCategory },
                      { model: AgeGroups },
                      { model: AgeSubgroup },
                      { model: Referees },
                    ],
                  },
                ],
              },
            ],
          });
          console.log(anyTeamPrograms[1]);
          console.log(1111111111);
        } else {
          anyTeamPrograms = await AnyTeamProgram.findAll({
            where: {
              anyTeamProgram: anyTeamProgram,
              anyTeamProgramYears: anyTeamProgramYears,
            },
            order: [["id", "ASC"]],
            include: [
              {
                model: Teams,
                order: [["createdAt", "ASC"]],
                include: [
                  {
                    model: Sportsmans,
                    as: "sportsmansArray",
                    required: false,
                    where: {
                      ageSubgroupId: anyTeamProgramYears,
                      id: { [Op.not]: program.sportsmansId },
                    },
                    include: [
                      { model: SportCategory },
                      { model: AgeGroups },
                      { model: AgeSubgroup },
                      { model: Referees },
                    ],
                  },
                ],
              },
            ],
          });
        }

        if (anyTeamPrograms[index]) {
          let sportsmans;

          if (anyTeamProgramYears == 3 && anyTeamProgram == 5) {
            sportsmans = await Promise.all(
              anyTeamPrograms[index].sportsmansId.map(async (sportsmanItem) => {
                if (sportsmanItem === 0) return 0;
                return await Sportsmans.findOne({
                  order: [["createdAt", "ASC"]],
                  where: {
                    [Op.or]: [
                      { ageSubgroupId: anyTeamProgramYears },
                      { ageSubgroupId: 4 },
                    ],
                    id: sportsmanItem,
                  },
                  include: [
                    { model: AgeGroups },
                    { model: AgeSubgroup },
                    { model: Referees },
                    { model: SportCategory },
                    { model: Teams },
                  ],
                });
              })
            );
          } else {
            sportsmans = await Promise.all(
              anyTeamPrograms[index].sportsmansId.map(async (sportsmanItem) => {
                if (sportsmanItem === 0) return 0;
                return await Sportsmans.findOne({
                  order: [["createdAt", "ASC"]],
                  where: {
                    ageSubgroupId: anyTeamProgramYears,
                    id: sportsmanItem,
                  },
                  include: [
                    { model: AgeGroups },
                    { model: AgeSubgroup },
                    { model: Referees },
                    { model: SportCategory },
                    { model: Teams },
                  ],
                });
              })
            );
          }

          anyTeamPrograms[index].dataValues.sportsmans = sportsmans;
        }

        return anyTeamPrograms[index];
      });

      const results = await Promise.all(promises);

      anyTeamPrograms = results;
    }

    res.json(anyTeamPrograms);
  }
  async putAnyTeamProgram(req, res) {
    const { anyTeamProgramsId, teamId } = req.body.anyTeamProgram;
    const anyTeamProgramsFind = await AnyTeamProgram.findOne({
      where: { id: anyTeamProgramsId },
    });

    console.log(11111111111);

    anyTeamProgramsFind.sportsmansId = [...anyTeamProgramsFind.sportsmansId, 0];
    anyTeamProgramsFind.outOfCompetitions = [
      ...anyTeamProgramsFind.outOfCompetitions,
      false,
    ];

    anyTeamProgramsFind.teamId = teamId;
    anyTeamProgramsFind.sportsmansId = [0];
    anyTeamProgramsFind.save();

    res.json("Сохранилось");
  }
  async putAnyTeamProgramSportsman(req, res) {
    const { anyTeamProgramsId, sportsmanId, index } = req.body.anyTeamProgram;

    const anyTeamProgramsFind = await AnyTeamProgram.findOne({
      where: { id: anyTeamProgramsId },
    });

    if (!anyTeamProgramsFind.sportsmansId.includes(sportsmanId)) {
      if (anyTeamProgramsFind.sportsmansId) {
        let newArray = [...anyTeamProgramsFind.sportsmansId];

        newArray[index] = sportsmanId;

        anyTeamProgramsFind.sportsmansId = newArray;
      } else {
        anyTeamProgramsFind.sportsmansId = [sportsmanId];
      }

      await anyTeamProgramsFind.save();
    }

    res.json("Сохранилось");
  }

  //переделать
  async putAnyTeamProgramSportsmanOutOfCompetition(req, res) {
    const { anyTeamProgramsId, checked, index } = req.body.anyTeamProgram;

    console.log(222222222);

    console.log(req.body.anyTeamProgram);

    const anyTeamProgramsFind = await AnyTeamProgram.findOne({
      where: { id: anyTeamProgramsId },
    });

    anyTeamProgramsFind.outOfCompetitions = checked;

    // if (!anyTeamProgramsFind.sportsmansId.includes(sportsmanId)) {
    // if (anyTeamProgramsFind.sportsmansId) {
    //   let newArray = [...anyTeamProgramsFind.sportsmansId];

    //   newArray[index] = sportsmanId;

    //   anyTeamProgramsFind.sportsmansId = newArray;
    // } else {
    //   anyTeamProgramsFind.sportsmansId = [sportsmanId];
    // }

    await anyTeamProgramsFind.save();
    // }

    res.json("Сохранилось");
  }

  async createAnyTeamProgramSportsmanSporstman(req, res) {}

  async putAnyTeamProgramOutOfCompetition(req, res) {
    const { anyTeamProgramsId, checked, index } = req.body.anyTeamProgram;

    const anyTeamProgramsFind = await AnyTeamProgram.findOne({
      where: { id: anyTeamProgramsId },
    });

    if (anyTeamProgramsFind.outOfCompetitions) {
      let newArray = [...anyTeamProgramsFind.outOfCompetitions];

      newArray[index] = checked;

      anyTeamProgramsFind.outOfCompetitions = newArray;
    } else {
      anyTeamProgramsFind.outOfCompetitions = [checked];
    }

    await anyTeamProgramsFind.save();

    res.json("Сохранилось");
  }
}

module.exports = new AnyTeamProgramControll();
