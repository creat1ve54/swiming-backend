const { TournamentName } = require("../models/models");

class TournamentNameControll {
  async getTournamentName(req, res) {
    try {
      const tournamentName = await TournamentName.findOne({});      
      res.json(tournamentName);
    } catch (error) {
      console.log(error);
    }
  }
  async putTournamentName(req, res) {
    try {
      const { tournament } = req.body;
      const tournamentFind = await TournamentName.findOne({});
      tournamentFind.name = tournament.tournamentName;
      tournamentFind.date = tournament.dateAndPlaceOfRealization;
      await tournamentFind.save();
      res.json(tournamentFind);
    } catch (error) {
      res.json({ message: "Что-то пошло не так" });
    }
  }
}

module.exports = new TournamentNameControll();
