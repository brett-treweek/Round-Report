const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Round {
    _id: ID
    roundNumber: Int!
    startAddress: String
    hazards: [Hazard]
  }

  type Hazard {
    _id: ID
    roundNumber: Int!
    round: Round
    hazardType: String!
    title: String
    message: String
    rating: String
    imageFile: String
    location: String!
    createdAt: String
    creator: String
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    hazards: [Hazard]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    GetAllRounds: [Round]
    GetOneRound(roundNumber: Int!): Round
    GetAllHazards: [Hazard]
    GetOneHazard(_id: ID!): Hazard
    GetUser(_id: ID!): User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
