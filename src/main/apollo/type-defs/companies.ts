import { gql } from "apollo-server"

export default gql`
	type Companies {
		id: String!
		code: String!
		name: String!
		status: Boolean
		vatNumber: String
		identificationNumber: String
		fiscalName: String
		contacts: [Contact]
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

	input UpdateCompanyInput {
		id: String!
		code: String
		name: String
		status: Boolean
		vatNumber: String
		identificationNumber: String
		fiscalName: String
		contacts: [UpdateContactInput]
	}

	input CompaniesFilterInput {
		status: Boolean
	}

	input CompaniesPaginationInput {
		skip: Int
		take: Int
	}

	enum CompaniesOrderByKey {
		ID
		NAME
		CODE
	}

	enum CompaniesOrderBySort {
		ASC
		DESC
	}

	input CompaniesOrderBy {
		key: CompaniesOrderByKey
		sort: CompaniesOrderBySort
	}

	extend type Query {
		companies(
			filter: CompaniesFilterInput
			pagination: CompaniesPaginationInput
			search: String
			orderBy: CompaniesOrderBy
		): [Companies] @auth
		company(id: String): Companies @auth
	}

	extend type Mutation {
		createCompany(input: CreateCompanyInput): Companies @auth
		updateCompany(input: UpdateCompanyInput): Companies @auth
		deleteCompany(id: String!): Boolean @auth
	}
`
