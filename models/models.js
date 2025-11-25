const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Teams = sequelize.define("teams", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameTeam: { type: DataTypes.STRING, defaultValue: "" },
});

const Sportsmans = sequelize.define("sportsmans", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  surname: { type: DataTypes.STRING, defaultValue: "" },
  firstname: { type: DataTypes.STRING, defaultValue: "" },
  surnameAndFirstname: { type: DataTypes.STRING, defaultValue: "" },
  years: { type: DataTypes.STRING, defaultValue: "" },
  // sportCategory: { type: DataTypes.STRING, defaultValue: "" },
  // yearsGroup: { type: DataTypes.INTEGER, defaultValue: "" },
  // yearsSubgroup: { type: DataTypes.INTEGER, defaultValue: "" },
  requiredProgramm: { type: DataTypes.BOOLEAN, defaultValue: true },
  outOfCompetition: { type: DataTypes.BOOLEAN, defaultValue: false },
  mandatoryProgramSolo: { type: DataTypes.BOOLEAN, defaultValue: false },
  // mandatoryProgramSoloDrawId: { type: DataTypes.INTEGER, defaultValue: null },
  // mandatoryProgramDuo:  { type: DataTypes.BOOLEAN, defaultValue: false },
  // mandatoryProgramDuoR:  { type: DataTypes.BOOLEAN, defaultValue: false },
  // mandatoryProgramDuoDrawId: { type: DataTypes.INTEGER, defaultValue: null },
  // mandatoryProgramDuoMixed:  { type: DataTypes.BOOLEAN, defaultValue: false },
  // mandatoryProgramDuoMixedR:  { type: DataTypes.BOOLEAN, defaultValue: false },
  // mandatoryProgramDuoMixedDrawId: { type: DataTypes.INTEGER, defaultValue: null },
  // mandatoryProgramGroup:  { type: DataTypes.BOOLEAN, defaultValue: false },
  // mandatoryProgramGroupR:  { type: DataTypes.BOOLEAN, defaultValue: false },
  // mandatoryProgramGroupDrawId: { type: DataTypes.INTEGER, defaultValue: null },
  // mandatoryProgramCombi:  { type: DataTypes.BOOLEAN, defaultValue: false },
  // mandatoryProgramCombiR:  { type: DataTypes.BOOLEAN, defaultValue: false },
  // mandatoryProgramCombiDrawId: { type: DataTypes.INTEGER, defaultValue: null },
  // coach: { type: DataTypes.INTEGER, defaultValue: "" },
});

const ElementsOfTechnicalPrograms = sequelize.define(
  "elementsOfTechnicalPrograms",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameElementsProgram: { type: DataTypes.STRING, defaultValue: "" },
    groupId: { type: DataTypes.INTEGER},
  }
);

const ElementsProgram = sequelize.define("elementsProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  groupId: { type: DataTypes.INTEGER},
  nameElementProgram: { type: DataTypes.STRING, defaultValue: "" },
  ratio: { type: DataTypes.DOUBLE, defaultValue: 0 },
});

const Figures = sequelize.define("figures", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  kod: { type: DataTypes.STRING, defaultValue: "" },
  name: { type: DataTypes.STRING, defaultValue: "" },
  nameEng: { type: DataTypes.STRING, defaultValue: "" },
  ratio: { type: DataTypes.DOUBLE, defaultValue: 0 },
});

const DutiesOfJudges = sequelize.define("dutiesOfJudges", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, defaultValue: "" },
  nameShort: { type: DataTypes.STRING, defaultValue: "" },
});

const AgeGroups = sequelize.define("ageGroups", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, defaultValue: "" },
  nameShort: { type: DataTypes.STRING, defaultValue: "" },
});

const AgeSubgroup = sequelize.define("ageSubgroup", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, defaultValue: "" },
});

const SportCategory = sequelize.define("sportCategory", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, defaultValue: "" },
});

const BrigadeOne = sequelize.define("brigadeOne", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BrigadeTwo = sequelize.define("brigadeTwo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BrigadeThree = sequelize.define("brigadeThree", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BrigadeFour = sequelize.define("brigadeFour", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ListReferee = sequelize.define("listReferee", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mainBrigadeId: { type: DataTypes.INTEGER },
});

const RefereesBrigades = sequelize.define("refereesBrigades", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mainProgramId: { type: DataTypes.INTEGER },
  brigadeOneId: { type: DataTypes.INTEGER },
  brigadeTwoId: { type: DataTypes.INTEGER },
  brigadeThreeId: { type: DataTypes.INTEGER },
  brigadeFourId: { type: DataTypes.INTEGER },
});

const MainBrigade = sequelize.define("mainBrigade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const MainProgram = sequelize.define("mainProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  requiredProgramName: { type: DataTypes.STRING },
});

const Referees = sequelize.define("referees", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  surname: { type: DataTypes.STRING, defaultValue: "" },
  firstname: { type: DataTypes.STRING, defaultValue: "" },
  surnameAndFirstname: { type: DataTypes.STRING, defaultValue: "" },
  region: { type: DataTypes.STRING, defaultValue: "" },
  category: { type: DataTypes.STRING, defaultValue: "" },
});

//Жеребьевка
const Draw = sequelize.define("draw", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // mainProgramId: { type: DataTypes.INTEGER },
  drawOne: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  drawTwo: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  drawThree: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  activeDraw: { type: DataTypes.INTEGER },
});

//ЖеребьевкаПроизволка
const DrawAnyProgram = sequelize.define("drawAnyProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  groupId: { type: DataTypes.INTEGER },
  disciplineId: { type: DataTypes.INTEGER },
  // mainProgramId: { type: DataTypes.INTEGER },
  drawOne: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  drawTwo: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  drawThree: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  activeDraw: { type: DataTypes.INTEGER },
});

const SubgroupFigures = sequelize.define("subgroupFigures", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  subgroupId: { type: DataTypes.INTEGER },
  figureName: { type: DataTypes.STRING },
  brigadeNumber: { type: DataTypes.INTEGER, defaultValue: 1 },
});

//Итоговые таблицы для обязательной программы
//13-15
const MPOne = sequelize.define("MPOne", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  drawsNumber: { type: DataTypes.INTEGER },
  //Штраф
  scoresResultFinishOne: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //100%
  scoresResultFinishTwo: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //200%
  scoresResultFinishThree: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //scroreId
  //DrawsNumber
});
//Таблица спортсменов с оценками
const MPOneScore = sequelize.define("MPOneScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //спортсмен
  //фигура
  scores: { type: DataTypes.ARRAY(DataTypes.DOUBLE) },
  scoresResult: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  fine: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
});
//до 13
const MPTwo = sequelize.define("MPTwo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  drawsNumber: { type: DataTypes.INTEGER },
  //Штраф
  scoresResultFinishOne: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //100%
  scoresResultFinishTwo: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //200%
  scoresResultFinishThree: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
});
//Таблица спортсменов с оценками
const MPTwoScore = sequelize.define("MPTwoScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //спортсмен
  //фигура
  scores: { type: DataTypes.ARRAY(DataTypes.DOUBLE) },
  scoresResult: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  fine: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
});
//Дельфинник 2
const MPThree = sequelize.define("MPThree", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  drawsNumber: { type: DataTypes.INTEGER },
  //Штраф
  scoresResultFinishOne: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //100%
  scoresResultFinishTwo: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //200%
  scoresResultFinishThree: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
});
//Таблица спортсменов с оценками
const MPThreeScore = sequelize.define("MPThreeScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //спортсмен
  //фигура
  scores: { type: DataTypes.ARRAY(DataTypes.DOUBLE) },
  scoresResult: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  fine: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
});
//Дельфинник 1
const MPFour = sequelize.define("MPFour", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  drawsNumber: { type: DataTypes.INTEGER },
  //Штраф
  scoresResultFinishOne: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //100%
  scoresResultFinishTwo: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //200%
  scoresResultFinishThree: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
});
//Таблица спортсменов с оценками
const MPFourScore = sequelize.define("MPFourScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //спортсмен
  //фигура
  scores: { type: DataTypes.ARRAY(DataTypes.DOUBLE) },
  scoresResult: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  fine: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
});

//Произвольная программа команды
const AnyTeamProgram = sequelize.define("anyTeamProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sportsmansId: {type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []},
  outOfCompetitions: {type: DataTypes.BOOLEAN, defaultValue: false},
  reserve: {type: DataTypes.ARRAY(DataTypes.BOOLEAN), defaultValue: []},
  anyTeamProgram: { type: DataTypes.INTEGER},
  anyTeamProgramYears: { type: DataTypes.INTEGER},
});

const BrigadeEl = sequelize.define("brigadeEl", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BrigadeAl = sequelize.define("brigadeAl", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BrigadeDTC = sequelize.define("brigadeDTC", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BrigadeSTC = sequelize.define("brigadeSTC", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});


const ListRefereeAnyProgram = sequelize.define("listRefereeAnyProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mainAnyProgramBrigadeId: { type: DataTypes.INTEGER },
});

const RefereesAnyProgramBrigades = sequelize.define("refereesAnyProgramBrigades", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mainAnyProgramBrigadeId: { type: DataTypes.INTEGER },
  brigadeElId: { type: DataTypes.INTEGER },
  brigadeAlId: { type: DataTypes.INTEGER },
  brigadeDTCId: { type: DataTypes.INTEGER },
  brigadeSTCId: { type: DataTypes.INTEGER },
});

const MainAnyProgramBrigade = sequelize.define("mainAnyProgramBrigade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const MainAnyProgram = sequelize.define("mainAnyProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  requiredAnyProgramName: { type: DataTypes.STRING },
});




//Произвольная программа расчет оценок
const MPOneAnyProgram = sequelize.define("MPOneAnyProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  drawsNumber: { type: DataTypes.INTEGER },
  disciplineId: { type: DataTypes.INTEGER },
  groupId: { type: DataTypes.INTEGER },
  scoresResultFinishElements: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  scoresResultFinishImpression: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  scoresResultFinishFigures: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //Штраф
  scoresResultFinishOne: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //100%
  scoresResultFinishTwo: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //200%
  scoresResultFinishThree: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  sinxr: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  totalDD: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  finalDD: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  //scroreId
  // teamId: {type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []},
  // teamId: {type: DataTypes.INTEGER},
});
//Таблица спортсменов с оценками
const MPOneScoreAnyProgram= sequelize.define("MPOneScoreAnyProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  disciplineId: { type: DataTypes.INTEGER },
  groupId: { type: DataTypes.INTEGER },
  //спортсмен
  // elements
  scores: { type: DataTypes.ARRAY(DataTypes.DOUBLE) },
  scoresResult: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  DD: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  fine: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
});

const MPOneScoreIpressionAnyProgram= sequelize.define("MPOneScoreIpressionAnyProgram", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  disciplineId: { type: DataTypes.INTEGER },
  groupId: { type: DataTypes.INTEGER },
  //спортсмен
  // elements
  scores: { type: DataTypes.ARRAY(DataTypes.DOUBLE) },
  scoresResult: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
  fine: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
});


// AnyTeamProgram.hasMany(Sportsmans, { as: "sportsmansArray" });
// Sportsmans.belongsTo(AnyTeamProgram);

Teams.hasMany(AnyTeamProgram);
AnyTeamProgram.belongsTo(Teams);





Sportsmans.hasMany(MPOneScore);
MPOneScore.belongsTo(Sportsmans);

SubgroupFigures.hasMany(MPOneScore);
MPOneScore.belongsTo(SubgroupFigures);

MPOne.hasMany(MPOneScore, { as: "MPScoreArray" });
MPOneScore.belongsTo(MPOne);

Sportsmans.hasMany(MPOne);
MPOne.belongsTo(Sportsmans);

Sportsmans.hasMany(MPTwoScore);
MPTwoScore.belongsTo(Sportsmans);

SubgroupFigures.hasMany(MPTwoScore);
MPTwoScore.belongsTo(SubgroupFigures);

MPTwo.hasMany(MPTwoScore, { as: "MPScoreArray" });
MPTwoScore.belongsTo(MPTwo);

Sportsmans.hasMany(MPTwo);
MPTwo.belongsTo(Sportsmans);

Sportsmans.hasMany(MPThreeScore);
MPThreeScore.belongsTo(Sportsmans);

SubgroupFigures.hasMany(MPThreeScore);
MPThreeScore.belongsTo(SubgroupFigures);

MPThree.hasMany(MPThreeScore, { as: "MPScoreArray" });
MPThreeScore.belongsTo(MPThree);

Sportsmans.hasMany(MPThree);
MPThree.belongsTo(Sportsmans);

Sportsmans.hasMany(MPFourScore);
MPFourScore.belongsTo(Sportsmans);

SubgroupFigures.hasMany(MPFourScore);
MPFourScore.belongsTo(SubgroupFigures);

MPFour.hasMany(MPFourScore, { as: "MPScoreArray" });
MPFourScore.belongsTo(MPFour);

Sportsmans.hasMany(MPFour);
MPFour.belongsTo(Sportsmans);

Figures.hasMany(SubgroupFigures);
SubgroupFigures.belongsTo(Figures);

Draw.hasMany(Sportsmans, { as: "sportsmansArray" });
Sportsmans.belongsTo(Draw);

// DrawAnyProgram.hasMany(AnyTeamProgram, { as: "anyTeamProgramArray" });
// AnyTeamProgram.belongsTo(DrawAnyProgram);

// Sportsmans.hasMany(SoloSportsmens);
// SoloSportsmens.belongsTo(Sportsmans);

// AgeGroups.hasMany(SoloSportsmens);
// SoloSportsmens.belongsTo(AgeGroups);

// Teams.hasMany(SoloSportsmens);
// SoloSportsmens.belongsTo(Teams);

// Sportsmans.hasMany(Teams, {as: 'sportsmansArray'});
// Teams.belongsTo(Sportsmans);

Teams.hasMany(Sportsmans, { as: "sportsmansArray" });
Sportsmans.belongsTo(Teams);

AgeGroups.hasMany(Sportsmans);
Sportsmans.belongsTo(AgeGroups);

AgeSubgroup.hasMany(Sportsmans);
Sportsmans.belongsTo(AgeSubgroup);

SportCategory.hasMany(Sportsmans);
Sportsmans.belongsTo(SportCategory);

Referees.hasMany(Sportsmans);
Sportsmans.belongsTo(Referees);

ElementsOfTechnicalPrograms.hasMany(ElementsProgram);
ElementsProgram.belongsTo(ElementsOfTechnicalPrograms);

MainBrigade.hasMany(ListReferee, { as: "listRefereeArray" });
ListReferee.belongsTo(MainBrigade);

DutiesOfJudges.hasMany(ListReferee);
ListReferee.belongsTo(DutiesOfJudges);

Referees.hasMany(ListReferee);
ListReferee.belongsTo(Referees);

MainBrigade.hasMany(MainProgram);
MainProgram.belongsTo(MainBrigade);

Referees.hasMany(RefereesBrigades);
RefereesBrigades.belongsTo(Referees);


BrigadeOne.hasMany(RefereesBrigades, { as: "refereesBrigades" });
RefereesBrigades.belongsTo(BrigadeOne);

BrigadeOne.hasMany(MainProgram);
MainProgram.belongsTo(BrigadeOne);

BrigadeTwo.hasMany(RefereesBrigades, { as: "refereesBrigades" });
RefereesBrigades.belongsTo(BrigadeTwo);

BrigadeTwo.hasMany(MainProgram);
MainProgram.belongsTo(BrigadeTwo);

BrigadeThree.hasMany(RefereesBrigades, { as: "refereesBrigades" });
RefereesBrigades.belongsTo(BrigadeThree);

BrigadeThree.hasMany(MainProgram);
MainProgram.belongsTo(BrigadeThree);

BrigadeFour.hasMany(RefereesBrigades, { as: "refereesBrigades" });
RefereesBrigades.belongsTo(BrigadeFour);

BrigadeFour.hasMany(MainProgram);
MainProgram.belongsTo(BrigadeFour);

Referees.hasMany(RefereesAnyProgramBrigades);
RefereesAnyProgramBrigades.belongsTo(Referees);

MainAnyProgramBrigade.hasMany(MainAnyProgram);
MainAnyProgram.belongsTo(MainAnyProgramBrigade);

DutiesOfJudges.hasMany(ListRefereeAnyProgram);
ListRefereeAnyProgram.belongsTo(DutiesOfJudges);

Referees.hasMany(ListRefereeAnyProgram);
ListRefereeAnyProgram.belongsTo(Referees);

MainAnyProgramBrigade.hasMany(ListRefereeAnyProgram, { as: "listRefereeArray" });
ListRefereeAnyProgram.belongsTo(MainAnyProgramBrigade);

BrigadeAl.hasMany(RefereesAnyProgramBrigades, { as: "refereesAnyBrigades" });
RefereesAnyProgramBrigades.belongsTo(BrigadeAl);

BrigadeAl.hasMany(MainAnyProgram);
MainAnyProgram.belongsTo(BrigadeAl);

BrigadeDTC.hasMany(RefereesAnyProgramBrigades, { as: "refereesAnyBrigades" });
RefereesAnyProgramBrigades.belongsTo(BrigadeDTC);

BrigadeDTC.hasMany(MainAnyProgram);
MainAnyProgram.belongsTo(BrigadeDTC);

BrigadeEl.hasMany(RefereesAnyProgramBrigades, { as: "refereesAnyBrigades" });
RefereesAnyProgramBrigades.belongsTo(BrigadeEl);

BrigadeEl.hasMany(MainAnyProgram);
MainAnyProgram.belongsTo(BrigadeEl);

BrigadeSTC.hasMany(RefereesAnyProgramBrigades, { as: "refereesAnyBrigades" });
RefereesAnyProgramBrigades.belongsTo(BrigadeSTC);

BrigadeSTC.hasMany(MainAnyProgram);
MainAnyProgram.belongsTo(BrigadeSTC);
// RefereesAnyProgrammBrigades.hasMany(ListReferee, { as: "listRefereeArray" });
// ListReferee.belongsTo(RefereesAnyProgrammBrigades);

// Referees.hasMany(RefereesAnyProgrammBrigades);
// RefereesAnyProgrammBrigades.belongsTo(Referees);

// MainBrigade.hasMany(MainAnyProgram);
// MainAnyProgram.belongsTo(MainBrigade);

// Execution.hasMany(RefereesAnyProgrammBrigades, { as: "refereesAnyProgrammBrigades" });
// RefereesAnyProgrammBrigades.belongsTo(Execution);

// Execution.hasMany(MainAnyProgram);
// MainAnyProgram.belongsTo(Execution);

// ArtisticImpression.hasMany(RefereesAnyProgrammBrigades, { as: "refereesAnyProgrammBrigades" });
// RefereesAnyProgrammBrigades.belongsTo(ArtisticImpression);

// ArtisticImpression.hasMany(MainAnyProgram);
// MainAnyProgram.belongsTo(ArtisticImpression);

// Complexity.hasMany(RefereesAnyProgrammBrigades, { as: "refereesAnyProgrammBrigades" });
// RefereesAnyProgrammBrigades.belongsTo(Complexity);

// Complexity.hasMany(MainAnyProgram);
// MainAnyProgram.belongsTo(Complexity);

//Произвольная программа расчет оценок связи
AnyTeamProgram.hasMany(MPOneScoreAnyProgram);
MPOneScoreAnyProgram.belongsTo(AnyTeamProgram);

ElementsProgram.hasMany(MPOneScoreAnyProgram);
MPOneScoreAnyProgram.belongsTo(ElementsProgram);

MPOneAnyProgram.hasMany(MPOneScoreAnyProgram, { as: "MPScoreAnyProgramArray" });
MPOneScoreAnyProgram.belongsTo(MPOneAnyProgram);

MPOneAnyProgram.hasMany(MPOneScoreIpressionAnyProgram, { as: "MPOneScoreIpressionAnyArray" });
MPOneScoreIpressionAnyProgram.belongsTo(MPOneAnyProgram);

AnyTeamProgram.hasMany(MPOneScoreIpressionAnyProgram);
MPOneScoreIpressionAnyProgram.belongsTo(AnyTeamProgram);

ElementsProgram.hasMany(MPOneScoreIpressionAnyProgram);
MPOneScoreIpressionAnyProgram.belongsTo(ElementsProgram);

AnyTeamProgram.hasMany(MPOneAnyProgram);
MPOneAnyProgram.belongsTo(AnyTeamProgram);

Sportsmans.hasMany(MPOneAnyProgram);
MPOneAnyProgram.belongsTo(Sportsmans);

Sportsmans.hasMany(MPOneScoreIpressionAnyProgram);
MPOneScoreIpressionAnyProgram.belongsTo(Sportsmans);

Sportsmans.hasMany(MPOneScoreAnyProgram);
MPOneScoreAnyProgram.belongsTo(Sportsmans);

module.exports = {
  ListReferee,
  MainBrigade,
  MainProgram,
  BrigadeOne,
  BrigadeTwo,
  BrigadeThree,
  BrigadeFour,
  RefereesBrigades,
  SportCategory,

  //произвольная программа
  // MainAnyProgram,
  // RefereesAnyProgrammBrigades,
  // Execution,
  // ArtisticImpression,
  // Complexity,

  Sportsmans,
  Teams,
  ElementsOfTechnicalPrograms,
  ElementsProgram,
  Figures,
  DutiesOfJudges,
  AgeGroups,
  AgeSubgroup,
  SubgroupFigures,
  // SoloSportsmens,

  Referees,
  Draw,
  DrawAnyProgram,

  // MTableOne,
  // DrawSportsmans

  MPOne,
  MPTwo,
  MPThree,
  MPFour,
  MPOneScore,
  MPTwoScore,
  MPThreeScore,
  MPFourScore,

  //произвольная
  AnyTeamProgram,
  BrigadeEl,
  BrigadeAl,
  BrigadeDTC,
  BrigadeSTC,
  MainAnyProgram,
  MainAnyProgramBrigade,
  ListRefereeAnyProgram,
  RefereesAnyProgramBrigades,

  //произвольная расчет оценок
  MPOneAnyProgram,
  MPOneScoreAnyProgram,
  MPOneScoreIpressionAnyProgram
};
