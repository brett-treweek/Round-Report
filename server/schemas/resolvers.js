const { Round, User, Hazard } = require('../models')

const resolvers = {
    Query: {
        GetAllRounds: async (parent, { hazards, _id }) => {
            
            return  await Round.find().populate('hazards');
        },
        GetOneRound: async (parent, { _id }) => {
            const params = _id ? { _id } : {}
            return await Round.findById(params)
        }, 
        GetAllHazards: async () => {
            return await Hazard.find({})
        },
        GetOneHazard: async (parent, {roundNumber}) => {
            const params = roundNumber ? { roundNumber } : {}
            return await Hazard.findById(params)
        }, 
        GetUser: async () => {
            return await User.find
        }
    }
}

module.exports = resolvers;