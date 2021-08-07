const db = require("../config/connection");
const { Round, Hazard } = require("../models");

const roundData = require("./roundData.json");
const hazardData = require("./hazardData.json");

db.once("open", async () => {
  await Round.deleteMany({});
  await Hazard.deleteMany({});

  const rnd = await Round.insertMany(roundData);
  const haz = await Hazard.insertMany(hazardData);

  // populating rounds with hazards
  rnd.forEach(async (round) => {
    const id = round._id;
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
