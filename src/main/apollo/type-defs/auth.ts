import { gql } from "apollo-server";

export default gql`
  type Authentication {
    accessToken: String!
  }

  extend type Mutation {
    createAuthentication(email: String, password: String): Authentication
  }
`
