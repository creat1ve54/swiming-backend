const {
  RefereesBrigades,
  ListReferee,
  DutiesOfJudges,
  Referees,
  MainBrigade,
} = require("../models/models");

class RefereesBrigadesControll {
  // async createReferee(req, res) {
  //   const { mainBrigadeId } = req.body;

  //   const refereeResult = await ListReferee.create({
  //     mainBrigadeId: mainBrigadeId,
  //     dutiesOfJudgeId: null,
  //     refereeId: null,
  //   });

  //   res.json(refereeResult);
  // }

  // async getReferees(req, res) {
  //   const referees = await ListReferee.findAll();

  //   await Promise.all(
  //     referees.map(async (el) => {
  //       const dutieOfJudge = await DutiesOfJudges.findOne({
  //         where: { id: el.post },
  //       });
  //       const referee = await Referees.findOne({
  //         where: { id: el.referee },
  //       });
  //       el.post = dutieOfJudge;
  //       el.referee = referee;
  //       return el;
  //     })
  //   );

  //   res.json(referees);
  // }

  // async updatePost(req, res) {
  //   const { listRefereeId, postId } = req.body.postInfo;
  //   const refereeResult = await ListReferee.findOne({
  //     where: {
  //       id: listRefereeId,
  //     },
  //   });

  //   refereeResult.dutiesOfJudgeId = postId;
  //   await refereeResult.save();
  //   res.json(refereeResult);
  // }

  async updateReferee(req, res) {
    const { refereesBrigadesId, refereeId } = req.body.refereesBrigadesInfo;

    const refereeResult = await RefereesBrigades.findOne({
      where: {
        id: refereesBrigadesId,
      },
    });

    if(refereeId == 0) {
      refereeResult.refereeId = null;
    } else {
      refereeResult.refereeId = refereeId;
    }

    await refereeResult.save();
    res.json(refereeResult);
  }

  // async deleteReferee(req, res) {
  //   const { id } = req.params;
  //   const listReferee = await ListReferee.destroy({ where: { id: id } });
  //   res.json(listReferee);
  // }
}

module.exports = new RefereesBrigadesControll();
