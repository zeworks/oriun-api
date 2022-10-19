import { gql } from 'apollo-server-express'

export default gql`
  scalar DateTime
  directive @hasRole(role: String!) on FIELD_DEFINITION | FIELD
  
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`
