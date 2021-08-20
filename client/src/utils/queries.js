// GQL/apollo-client queries
import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
    }
  }
`;
export const QUERY_ROUND = gql`
  query getOneRound($roundNumber: Int!) {
    getOneRound(roundNumber: $roundNumber) {
      _id
      roundNumber
      startAddress
      lpo
      lat
      lng
      hazards{
        _id
        roundNumber
        hazardType
        address
        message
        lat
        lng
        user {
          _id
        }
      }
    }
  }
`;

export const QUERY_HAZARDS = gql`
  {
    getAllHazards {
      _id
      hazardType
      roundNumber
      round {
        startAddress
        lpo
      }
      address
      message
      lat
      lng
      user {
        _id
      }
    }
  }
`;
