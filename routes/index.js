const Router = require("express");
const router = new Router();

const sportsmensRouter = require("./sportsmansRouter");
const teamsRouter = require("./teamsRouter");
const elementProgrammRouter = require("./elementProgrammRouter");
const elementsOfTechnicalProgramsRouter = require("./elementsOfTechnicalProgramsRouter");
const ageGroupRouter = require("./ageGroupsRouter");
const ageSubroupRouter = require("./ageSubgroupsRouter");
const sportCategorysRouter = require("./sportCategorysRouter");
const figuresRouter = require("./figuresRouter");
const dutiesOfJudgesRouter = require("./dutiesOfJudgesRouter");
const soloSportsmensRouter = require("./soloSportsmensRouter");

const brigadeRouter = require("./brigadeRouter");
const listRefereeRouter = require("./listRefereeRouter");
const refereesBrigadesRouter = require("./refereesBrigadesRouter");
const mainProgramRouter = require("./mainProgramRouter");
const mainBrigadeRouter = require("./mainBrigadeRouter");
const refereeRouter = require("./refereeRouter");
const drawRouter = require("./drawRouter");
const drawAnyRouter = require("./drawAnyRouter");
const subgroupFiguresRouter = require("./subgroupFiguresRouter");

const ratingsRouter = require("./ratingsRouter");
const ratingsAnyProgramRouter = require("./ratingsAnyProgramRouter");

const compositionRouter = require("./compositionRouter");
const listRefereeAnyProgramRouter = require("./listRefereeAnyProgramRouter");
const refereesAnyProgramBrigadesRouter = require("./refereesAnyProgramBrigadesRouter");
const mainAnyProgramRouter = require("./mainAnyProgramRouter");
const mainAnyProgramBrigadeRouter = require("./mainAnyProgramBrigadeRouter");
//произвольная программа
const anyTeamProgramRouter = require("./anyTeamProgramRouter");
router.use("/any-team-program", anyTeamProgramRouter);



router.use("/sportsmans", sportsmensRouter);
router.use("/teams", teamsRouter);
router.use(
  "/elements-of-technical-programs",
  elementsOfTechnicalProgramsRouter
);
router.use("/element-program", elementProgrammRouter);
router.use("/figures", figuresRouter);
router.use("/duties-of-judges", dutiesOfJudgesRouter);
router.use("/age-groups", ageGroupRouter);
router.use("/age-subgroups", ageSubroupRouter);
router.use("/sport-categorys", sportCategorysRouter);
router.use("/solo-sportsmens", soloSportsmensRouter);

router.use("/brigade", brigadeRouter);
router.use("/list-referee", listRefereeRouter);
router.use("/referees-brigades", refereesBrigadesRouter);
router.use("/main-program", mainProgramRouter);
router.use("/main-brigade", mainBrigadeRouter);
router.use("/referees-and-coaches", refereeRouter);

router.use("/draw", drawRouter);
router.use("/subgroup-figures", subgroupFiguresRouter);
router.use("/draw-any-program", drawAnyRouter);

router.use("/ratings", ratingsRouter);
router.use("/ratings-any-program", ratingsAnyProgramRouter);

router.use("/composition", compositionRouter);
router.use("/list-any-program-referee", listRefereeAnyProgramRouter);
router.use("/referees-any-program-brigades", refereesAnyProgramBrigadesRouter);
router.use("/main-any-program", mainAnyProgramRouter);
router.use("/main-brigade", mainAnyProgramBrigadeRouter);
// router.use("/referees-and-coaches", refereeRouter);


module.exports = router;
