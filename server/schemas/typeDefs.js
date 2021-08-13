const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Round {
    _id: ID
    roundNumber: Int!
    startAddress: String
    hazards: [Hazard]
    lpo: String!
  }

  type Hazard {
    _id: ID
    roundNumber: Int!
    round: Round
    hazardType: String!
    message: String
    address: String!
    lat: Float!
    lng: Float!
    user: User
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
    getAllRounds: [Round]
    getOneRound(roundNumber: Int!): Round
    getAllHazards: [Hazard]
    getOneHazard(_id: ID!): Hazard
    getUser(_id: ID!): User
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

    addHazard(
      roundNumber: Int!
      hazardType: String!
      message: String
      address: String!
      lat: Float!
      lng: Float!
      user: ID
    ): Hazard
  }
`;

module.exports = typeDefs;
