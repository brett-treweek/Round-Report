import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_HAZARD = gql`
  mutation addHazard(
    $roundNumber: Int!
    $hazardType: String!
    $message: String
    $address: String!
    $lat: Float!
    $lng: Float!
  ) {
    addHazard(
      roundNumber: $roundNumber
      hazardType: $hazardType
      message: $message
      address: $address
      lat: $lat
      lng: $lng
    ){
      _id
      roundNumber
      hazardType
      message
      address
      lat
      lng
    }
  }


`
