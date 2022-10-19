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
    departments(status: Boolean): [Department]
    department(id: String!): Department
  }

  type Mutation {
    createDepartment(input: CreateDepartmentInput): Department
    updateDepartment(id: String!, input: UpdateDepartmentInput): Department
    deleteDepartment(id: String!): Boolean
  }
`
