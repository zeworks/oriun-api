import { gql } from "apollo-server";

export default gql`
  type Companies {
    id: String!
    code: String!
    name: String!
    status: Boolean
    vatNumber: String
    identificationNumber: String
    fiscalName: String
    contacts: [Contacts]
    createdAt: DateTime!
  }

  input CreateCompanyInput {
    code: String!
    name: String!
    status: Boolean
    vatNumber: String
    identificationNumber: String
    fiscalName: String
    contacts: [CreateContactInput]
  }

  input CompaniesFilterInput {
    status: Boolean
  }

  input CompaniesPaginationInput {
    skip: Int
    take: Int
  }

  extend type Query {
    companies(filter: CompaniesFilterInput, pagination: CompaniesPaginationInput, search: String): [Companies] @auth
  }

  extend type Mutation {
    createCompany(input: CreateCompanyInput): Companies @auth
  }
`