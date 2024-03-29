import { gql } from "apollo-server"

export default gql`
	type Client {
		id: String!
		name: String!
		code: String!
		identificationNumber: String!
		picture: String
		status: Boolean
		createdAt: DateTime!
		updatedAt: DateTime
		company: Companies
		contacts: [Contact]
	}

	input ClientCompany {
		id: String
	}

	input ClientContact {
		id: String
	}

	input ClientCreate {
		name: String!
		code: String!
		identificationNumber: String!
		picture: String
		status: Boolean
		company: ClientCompany
		contacts: [ClientContact]
	}

	input ClientUpdate {
		id: String!
		name: String
		code: String
		identificationNumber: String
		picture: String
		status: Boolean
		company: ClientCompany
		contacts: [ClientContact]
	}

	input ClientsFilterInput {
		status: Boolean
	}

	input ClientsPaginationInput {
		skip: Int
		take: Int
	}

	enum ClientsOrderByKey {
		ID
		NAME
		CODE
	}

	enum ClientsOrderBySort {
		ASC
		DESC
	}

	input ClientsOrderBy {
		key: ClientsOrderByKey
		sort: ClientsOrderBySort
	}

	type ClientsDatatable {
		total: Int
		data: [Client]
	}

	extend type Query {
		clients(
			filter: ClientsFilterInput
			pagination: ClientsPaginationInput
			search: String
			orderBy: ClientsOrderBy
		): ClientsDatatable @auth
		client(id: String!): Client @auth
	}

	extend type Mutation {
		createClient(input: ClientCreate): Client @auth
		updateClient(input: ClientUpdate): Client @auth
		deleteClient(id: String!): Boolean @auth
	}
`
