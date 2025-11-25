const { Referees } = require("../models/models");

class RefereeControll {
  async createReferee(req, res) {
    try {
      const { surname, firstname, surnameAndFirstname, region, category } =
        req.body;
        
      const referees = await Referees.create({
        surname,
        firstname,
        surnameAndFirstname: surname + firstname,
        region,
        category,
      });
      console.log(referees);
      
      res.json(referees);
    } catch (error) {
      console.log(error);
    }
  }
  async getReferee(req, res) {
    try {
      const referees = await Referees.findAll({
        order: [["surname", "ASC"]],
      });
      res.json(referees);
    } catch (error) {
      console.log(error);
    }
  }
  async updateReferee(req, res) {
    try {
      const { refereesAndCoaches } = req.body;

      refereesAndCoaches.forEach(async (refereeAndCoache) => {
        const refereeFind = await Referees.findOne({
          where: { id: refereeAndCoache.id },
        });

        if (refereeFind) {
          const surnameAndFirstname =
            refereeAndCoache.surname + " " + refereeAndCoache.firstname;
          refereeFind.surname = refereeAndCoache.surname;
          refereeFind.firstname = refereeAndCoache.firstname;
          refereeFind.surnameAndFirstname = surnameAndFirstname;
          refereeFind.region = refereeAndCoache.region;
          refereeFind.category = refereeAndCoache.category;
          await refereeFind.save();
        }
      });

      res.json(refereesAndCoaches);
    } catch (error) {
      res.json({ message: "Что-то пошло не так" });
    }
  }
  async deleteReferee(req, res) {
    const { id } = req.params;
    const deleteReferee = await Referees.destroy({ where: { id: id } });
    res.json(Number(id));
  }
}

module.exports = new RefereeControll();
