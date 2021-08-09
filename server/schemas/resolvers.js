const { Round, User, Hazard } = require("../models");
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


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
    GetUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id);

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
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
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
  }
};

module.exports = resolvers;
