import { gql } from "apollo-server";

export default gql`
  type Contacts {
    id: String!
    name: String!
    phone: String!
    prefix: String!
    address: String
    email: String
    country: String!
    default: Boolean!
    postalCode: String
    createdAt: DateTime!
  }

  input CreateContactInput {
    name: String!
    phone: String!
    prefix: String!
    address: String
    email: String
    country: String!
    default: Boolean!
    postalCode: String
  }
`