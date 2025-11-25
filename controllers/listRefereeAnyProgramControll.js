const {
  ListRefereeAnyProgram,
  DutiesOfJudges,
  Referees,
} = require("../models/models");
class ListRefereeAnyProgramControll {
  async createReferee(req, res) {
    const { mainAnyProgramBrigadeId } = req.body;    

    const refereeResult = await ListRefereeAnyProgram.create({
      mainAnyProgramBrigadeId: mainAnyProgramBrigadeId,
      dutiesOfJudgeId: null,
      refereeId: null,
    });

    res.json(refereeResult);
  }

  async getReferees(req, res) {
    const referees = await ListRefereeAnyProgram.findAll();

    await Promise.all(
      referees.map(async (el) => {
        const dutieOfJudge = await DutiesOfJudges.findOne({
          where: { id: el.post },
        });
        const referee = await Referees.findOne({
          where: { id: el.referee },
        });
        el.post = dutieOfJudge;
        el.referee = referee;
        return el;
      })
    );

    res.json(referees);
  }

  async updatePost(req, res) {
    const { listRefereeId, postId } = req.body.postInfo;

    const refereeResult = await ListRefereeAnyProgram.findOne({
      where: {
        id: listRefereeId,
      },
    });

    refereeResult.dutiesOfJudgeId = postId;
    await refereeResult.save();
    res.json(refereeResult);
  }

  async updateReferee(req, res) {
    const { listRefereeId, refereeId } = req.body.refereeInfo;

    const refereeResult = await ListRefereeAnyProgram.findOne({
      where: {
        id: listRefereeId,
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

  async deleteReferee(req, res) {
    const { id } = req.params;
    const listReferee = await ListRefereeAnyProgram.destroy({ where: { id: id } });
    res.json(listReferee);
  }
}

module.exports = new ListRefereeAnyProgramControll();
