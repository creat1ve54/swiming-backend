const {
  Teams,
  Sportsmans,
  SportCategory,
  AgeGroups,
  AgeSubgroup,
  Referees,
} = require("../models/models");

class TeamsControll {
  async createTeams(req, res) {
    try {
      const { nameTeam } = req.body;
      const team = await Teams.create({ nameTeam });
      res.json(team);
    } catch (error) {
      console.log(error);
    }
  }
  async getTeams(req, res) {
    try {
      const teams = await Teams.findAll({
        order: [["createdAt", "ASC"]],
        include: [
          {
            model: Sportsmans,
            as: "sportsmansArray",
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
      res.json({ teams });
    } catch (error) {
      console.log(error);
    }
  }
  async putTeams(req, res) {
    try {
      const { team } = req.body;
      const teamFind = await Teams.findOne({ where: { id: team.id } });
      teamFind.nameTeam = team.nameTeam;
      await teamFind.save();
      res.json(teamFind);
    } catch (error) {
      res.json({ message: "Что-то пошло не так" });
    }
  }
  async deleteTeam(req, res) {
    const { id } = req.params;
    const deleteSportmans = await Sportsmans.destroy({ where: { teamId: id } });
    const deleteTeam = await Teams.destroy({ where: { id: id } });
    res.json(Number(id));
  }
}

module.exports = new TeamsControll();
