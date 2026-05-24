const { ElementsProgram, ElementsOfTechnicalPrograms } = require("../models/models");

class ElementProgramControll {
  async createElementProgram(req, res) {
    const { nameElementProgram, ratio,elementsOfTechnicalProgramId } = req.body;
    const ementProgram = await ElementsProgram.create({
      nameElementProgram,
      ratio,
      elementsOfTechnicalProgramId
    });
    res.json(ementProgram);
  }
  async getElementProgram(req, res) {    
    const { groupId, elementsOfTechnicalProgramId, name } = req.query;

    console.log(req.query);
    
    console.log(name);
    

    const elementTechnical = await ElementsOfTechnicalPrograms.findAll({
      where: {
        groupId: groupId,
      },
      order: [["id", "ASC"]],
    })

    let number = 1;

    if(name == 'Техника') {
      number = 5
    }
    
    const elementProgram = await ElementsProgram.findAll({
      order: [["createdAt", "ASC"]],
      where: {elementsOfTechnicalProgramId: elementTechnical[elementsOfTechnicalProgramId - number].id}
    });

    
    res.json(elementProgram);
  }
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

module.exports = new ElementProgramControll();
