import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
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
    round{
      startAddress
    }
    address
    message
    lat
    lng
  }
}

`