const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Round {
        _id: ID
        roundNumber: Int
        startAddress: String
        hazards: [Hazard]
    }

    type Hazard {
        _id: ID
        roundNumber: Int
        round: Round
        hazardType: String
        title: String
        message: String
        rating: String
        imageFile: String
        location: String
        createdAt: String
        creator: String
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        hazards: [Hazard]
    }

    type Query {
        GetAllRounds: [Round]
        GetOneRound(roundNumber: Int): Round
        GetAllHazards: [Hazard]
        GetOneHazard(_id: ID!): Hazard
        GetUser: User 
    }

`;

module.exports = typeDefs;