const { Round, User, Hazard } = require("../models");
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    // get all rounds with their associated hazrards
    GetAllRounds: async () => {
      return await Round.find().populate("hazards");
    },
    // get round by round number with its associated hazards
    GetOneRound: async (parent, {roundNumber}) => {
      return await Round.findOne({roundNumber}).populate('hazards');
    },
    // get all hazards with their associated round
    GetAllHazards: async () => {
      return await Hazard.find({}).populate("round");
    },
    // get hazard by id with its associated round
    GetOneHazard: async (parent, { _id }) => {
      return await Hazard.findById(_id).populate('round');
    },
    // get user by id with their associated hazards
    GetUser: async (parent, args, context) => {
      if (context.user) {
        // populate hazards
        const user = await User.findById(context.user.id).populate('hazards');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findByIdAndUpdate(context.user.id, args, {
    //       new: true,
    //     });
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log("password:", password);
      console.log("user:", user);
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      console.log("correctPassword", correctPw);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addHazard: async (parent, args) => {
      try {
        const hazard = await Hazard.create(args);
        return hazard;
      } catch (error) {
        console.log(error);
      }
      
    },
  }
};

module.exports = resolvers;
