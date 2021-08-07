const { Round, User, Hazard } = require("../models");

const resolvers = {
  Query: {
    GetAllRounds: async () => {
      return await Round.find().populate("hazards");
    },
    // get round by round number
    GetOneRound: async (parent, {roundNumber}) => {
      return await Round.findOne({roundNumber}).populate('hazards');
    },
    GetAllHazards: async () => {
      return await Hazard.find({}).populate("round");
    },
    // get hazard by id
    GetOneHazard: async (parent, { _id }) => {
      return await Hazard.findById(_id).populate('round');
    },
    GetUser: async () => {
      return await User.find;
    },
  },
};

module.exports = resolvers;
