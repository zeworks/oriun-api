import { gql } from "apollo-server";

export default gql`

  type Department {
    id: String!
    name: String!
    status: Boolean!
    createdAt: DateTime!
  }

  input CreateDepartmentInput {
    name: String!
    status: Boolean!
  }

  input UpdateDepartmentInput {
    name: String
    status: Boolean
  }

  type Query {
    departments(status: Boolean): [Department] @hasRole(role: "ADMIN")
    department(id: String!): Department @hasRole(role: "ADMIN")
  }

  type Mutation {
    createDepartment(input: CreateDepartmentInput): Department @hasRole(role: "ADMIN")
    updateDepartment(id: String!, input: UpdateDepartmentInput): Department @hasRole(role: "ADMIN")
    deleteDepartment(id: String!): Boolean @hasRole(role: "ADMIN")
  }
`
