import { gql } from "apollo-server";

export default gql`
  type Authentication {
    id: String!
    email: String!
    username: String!
    status: Boolean
    role: Role
    profile: UserProfile
    accessToken: String!
  }

  extend type Mutation {
    createAuthentication(email: String, password: String): Authentication
  }
`
