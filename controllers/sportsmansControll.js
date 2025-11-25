const {
  Sportsmans,
  AgeGroups,
  AgeSubgroup,
  Referees,
  SportCategory,
  Teams,
} = require("../models/models");

class SportsmansControll {
  async createSportsmans(req, res) {
    const {
      surname,
      firstname,
      years,
      sportCategory,
      ageGroup,
      ageSubgroup,
      requiredProgramm,
      outOfCompetition,
      mandatoryProgramSolo,
      // mandatoryProgramSoloDrawId,
      // mandatoryProgramDuo,
      // mandatoryProgramDuoR,
      // mandatoryProgramDuoDrawId,
      // mandatoryProgramDuoMixed,
      // mandatoryProgramDuoMixedR,
      // mandatoryProgramDuoMixedDrawId,
      // mandatoryProgramGroup,
      // mandatoryProgramGroupR,
      // mandatoryProgramGroupDrawId,
      // mandatoryProgramCombi,
      // mandatoryProgramCombiR,
      // mandatoryProgramCombiDrawId,
      referee,
      teamId,
    } = req.body.sportsmans;
    let surnameAndFirstname = "";
    if (surname && firstname) {
      surnameAndFirstname = surname + " " + firstname;
    }

    // let draws = [5, 6, 7, 8, 9];

    // if (ageSubgroup === 3) {
    //   draws = draws;
    // } else if (ageSubgroup === 2) {
    //   draws = draws.map((item) => item + 5);
    // } else if (ageSubgroup === 1) {
    //   draws = draws.map((item) => item + 10);
    // } else {
    //   draws = [];
    // }

    const sportsmans = await Sportsmans.create({
      surname,
      firstname,
      surnameAndFirstname,
      years,
      sportCategoryId: sportCategory,
      ageGroupId: ageGroup,
      ageSubgroupId: ageSubgroup,
      // yearsGroup,
      // yearsSubgroup,
      drawId: ageSubgroup,
      requiredProgramm,
      outOfCompetition,
      mandatoryProgramSolo,
      // mandatoryProgramSoloDrawId,
      // mandatoryProgramDuo,
      // mandatoryProgramDuoR,
      // mandatoryProgramDuoDrawId,
      // mandatoryProgramDuoMixed,
      // mandatoryProgramDuoMixedR,
      // mandatoryProgramDuoMixedDrawId,
      // mandatoryProgramGroup,
      // mandatoryProgramGroupR,
      // mandatoryProgramGroupDrawId,
      // mandatoryProgramCombi,
      // mandatoryProgramCombiR,
      // mandatoryProgramCombiDrawId,
      refereeId: referee,
      teamId,
    });
    res.json(sportsmans);
  }

  async getSportsmans(req, res) {
    try {
      const sportsmans = await Sportsmans.findAll({
        order: [["createdAt", "ASC"]],
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

      res.json(sportsmans);
    } catch (error) {
      console.log(error);
    }
  }

  async putSportsmans(req, res) {
    const { team, sportsman, field } = req.body.sportsmansAndTeam;
    console.log(req.body.sportsmansAndTeam);
    
    // const { team, sportsmans} = req.body.sportsmansAndTeam;
    
    const sportsmanUpdate = await Sportsmans.findOne({
      where: { id: sportsman },
    });

    if(field.name == 'ageSubgroupId') {
      sportsmanUpdate['drawId'] = field.value;
    }
    
    if(field.name == 'firstname' ) {
      sportsmanUpdate['surnameAndFirstname'] = sportsmanUpdate['surname'] + ' ' + field.value;
    }

    if(field.name == 'surname') {
      sportsmanUpdate['surnameAndFirstname'] = field.value + ' ' + sportsmanUpdate['firstname'];
    }
    

    sportsmanUpdate[field.name] = field.value;
    await sportsmanUpdate.save();

    res.json(sportsmanUpdate);

    // sportsmans.forEach(async (sportsman) => {
    //   const sportsmanUpdate = await Sportsmans.findOne({
    //     where: { teamId: team.id, id: sportsman.id },
    //   });

    //   if (sportsmanUpdate) {
    //     const surnameAndFirstname =
    //       sportsman.surname + " " + sportsman.firstname;
    //     sportsmanUpdate.surname = sportsman.surname;
    //     sportsmanUpdate.firstname = sportsman.firstname;
    //     sportsmanUpdate.surnameAndFirstname = surnameAndFirstname;
    //     sportsmanUpdate.years = sportsman.years;
    //     sportsmanUpdate.sportCategoryId = sportsman.sportCategoryId;
    //     sportsmanUpdate.ageGroupId = sportsman.ageGroupId;
    //     sportsmanUpdate.ageSubgroupId = sportsman.ageSubgroupId;
    //     sportsmanUpdate.drawId = sportsman.ageSubgroupId;
    //     sportsmanUpdate.requiredProgramm = sportsman.requiredProgramm;
    //     sportsmanUpdate.outOfCompetition = sportsman.outOfCompetition;
    //     sportsmanUpdate.mandatoryProgramSolo = sportsman.mandatoryProgramSolo;
    //     sportsmanUpdate.teamId = sportsman.teamId;
    //     await sportsmanUpdate.save();
    //   }
    // });
    // res.json({ team, sportsmans });
  }

  async deleteSportsman(req, res) {
    const { id } = req.params;
    const deleteSportsman = await Sportsmans.destroy({ where: { id: id } });
    res.json(Number(id));
  }
}

module.exports = new SportsmansControll();
