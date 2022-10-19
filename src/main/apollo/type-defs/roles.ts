import { gql } from "apollo-server";

export default gql`
  type Role {
    id: String!
    name: String!
    key: String!
    status: Boolean
    createdAt: DateTime!
    permissions: [Permission]
  }

  input CreateRoleInput {
    name: String!
    key: String!
    status: Boolean
    permissions: [PermissionInput]
  }

  input PermissionInput {
    id: String!
  }

  type Mutation {
    createRole(data: CreateRoleInput): Role @hasRole(role: "ADMIN")
  }
`;
