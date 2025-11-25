const { ElementsOfTechnicalPrograms } = require("../models/models");

class ElementsOfTechnicalProgramsControll {
  async createElementsOfTechnicalPrograms(req, res) {
    const { nameElementsProgram } = req.body;
    const elementsOfTechnicalPrograms =
      await ElementsOfTechnicalPrograms.create({
        nameElementsProgram,
      });
    res.json(elementsOfTechnicalPrograms);
  }

  async getElementsOfTechnicalPrograms(req, res) {
    const { groupId } = req.query;
    
    const elementsOfTechnicalPrograms =
      await ElementsOfTechnicalPrograms.findAll({
        order: [["id", "ASC"]],
        where: {groupId: groupId}
      });
      
    res.json(elementsOfTechnicalPrograms);
  }
  //   async createTeams(req, res) {
  //     try {
  //       const { nameTeam } = req.body;
  //       const team = await Teams.create({ nameTeam });
  //       res.json(team);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   async getTeams(req, res) {
  //     try {
  //       const teams = await Teams.findAll({ order: [["createdAt", "ASC"]] });
  //       res.json({ teams });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   async putTeams(req, res) {
  //     try {
  //       const { team } = req.body;
  //       const teamFind = await Teams.findOne({ where: { id: team.id } });
  //       teamFind.nameTeam = team.nameTeam;
  //       await teamFind.save();
  //       res.json(teamFind);
  //     } catch (error) {
  //       res.json({ message: "Что-то пошло не так" });
  //     }
  //   }
  //   async deleteTeam(req, res) {
  //     const { id } = req.params;
  //     const deleteSportmans = await Sportsmans.destroy({ where: { teamId: id } });
  //     const deleteTeam = await Teams.destroy({ where: { id: id } });
  //     res.json(Number(id));
  //   }
}

module.exports = new ElementsOfTechnicalProgramsControll();
