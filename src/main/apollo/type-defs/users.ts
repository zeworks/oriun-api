import { gql } from "apollo-server"

export default gql`
	type UserProfile {
		firstName: String!
		lastName: String
		picture: String
	}

	type User {
		id: String!
		username: String!
		email: String!
		status: Boolean
		identificationNumber: String
		profile: UserProfile
		role: Role
		department: Department
		accessToken: String
	}

	input UserProfileInput {
		firstName: String!
		lastName: String
		picture: String
	}

	input CreateAccount {
		username: String!
		email: String!
		status: Boolean
		password: String
		identificationNumber: String
		profile: UserProfileInput
		role: String
	}

	extend type Mutation {
		createAccount(input: CreateAccount): User @auth
	}

	extend type Query {
		accounts: [User] @auth
		account(id: String): User @auth
	}
`
