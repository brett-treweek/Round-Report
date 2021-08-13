import { gql } from '@apollo/client';


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
  {
    getOneRound {
    _id
    roundNumber
    startAddress
    lpo
    hazards{
      _id
      hazardType
      address
      message
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
    round{
      startAddress
      lpo
    }
    address
    message
    lat
    lng
    user{
      _id
    }
  }
}

`