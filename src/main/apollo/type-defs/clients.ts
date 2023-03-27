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

	input ClientCreate {
		name: String!
		code: String!
		identificationNumber: String!
		picture: String
		status: Boolean
		company: Companies
		contacts: [Contact]
	}

	input ClientUpdate {
		id: String!
		name: String
		code: String
		identificationNumber: String
		picture: String
		status: Boolean
		company: Companies
		contacts: [Contact]
	}

	extend type Query {
		client(id: String!): Client @auth
	}

	extend type Mutation {
		createClient(input: ClientCreate): Client @auth
		updateClient(input: ClientUpdate): Client @auth
	}
`
