const db = require('../config/connection');
const { Round, Hazard } = require('../models');

const roundData = require('./roundData.json');
const hazardData = require('./hazardData.json');

db.once('open', async () => {
  await Round.deleteMany({});
  await Hazard.deleteMany({});

  const round = await Round.insertMany(roundData);
  const hazard = await Hazard.insertMany(hazardData);

  // const tempRound = [...round]
  // const tempHazard = [...hazard]
  // console.log(tempRound);

  // tempRound.forEach(item => {
  //   if (item.roundNumber === tempHazard.roundNumber) {
  //     tempRound.hazards.push(tempHazard._id)
  //     tempRound.save()
  //   }
  // });
    
  

  console.log('Rounds and Hazards seeded!');
  process.exit(0);
});

