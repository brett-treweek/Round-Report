const { Round, User, Hazard } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    // get all rounds with their associated hazrards
    getAllRounds: async () => {
      return await Round.find().populate("hazard");
    },
    // get round by round number with its associated hazards
    getOneRound: async (parent, { roundNumber }) => {
      return await Round.findOne({ roundNumber }).populate({
        path: "hazards",
      });
    },
    // get all hazards with their associated round
    getAllHazards: async () => {
      return await Hazard.find({}).populate("round");
    },
    // get hazard by id with its associated round
    getOneHazard: async (parent, { _id }) => {
      return await Hazard.findById(_id).populate("round");
    },
    // get user by id with their associated hazards
    getUser: async (parent, args, context) => {
      if (context.user) {
        // populate hazards
        const user = await User.findById(context.user.id).populate("hazards");

        return user;
      }

      throw new AuthenticationError("Not logged in");
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
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      console.log("correctPassword", correctPw);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addHazard: async (parent, args, context) => {
      console.log(context.user);
      try {
        console.log(args);
        // use context not local storage
        const roundNumber = args.roundNumber;
        const hazard = await Hazard.create(args);

        const userID = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { hazards: hazard._id } }
        );

        const data = await Round.findOneAndUpdate(
          { roundNumber },
          { $push: { hazards: hazard._id } }
        );

        return hazard;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
