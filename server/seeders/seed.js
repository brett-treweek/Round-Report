const db = require("../config/connection");
const { Round, Hazard, User } = require("../models");

const roundData = require("./roundData.json");
const hazardData = require("./hazardData.json");

db.once("open", async () => {
  await Round.deleteMany({});
  await Hazard.deleteMany({});
  await User.deleteMany({});

  const rnd = await Round.insertMany(roundData);
  const haz = await Hazard.insertMany(hazardData);
  await User.create({
    firstName: 'Brett',
    lastName: 'Treweek',
    email: 'brett@mail.com',
    password: 'qwerty123',
    hazards: []
  });

  // populating rounds with hazards
  rnd.forEach(async (round) => {
    haz.forEach((haz) => {
      if (round.roundNumber === haz.roundNumber) {
        round.hazards.push(haz);
      }
    });
  });
  await Round.deleteMany({});
  await Round.insertMany(rnd);

  // pupulating hazards with a round 
  haz.forEach((hz) => {
    rnd.forEach((rd) => {
      const id = rd._id;
      if (rd.roundNumber === hz.roundNumber) {
        hz.round = id;
        console.log(haz.round);
      }
    });
  });
  await Hazard.deleteMany({});
  await Hazard.insertMany(haz);

  console.log("Rounds and Hazards seeded!!!");
  process.exit(0);
});
