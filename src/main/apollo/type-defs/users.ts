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
		contact: Contact
	}

	input CreateUserProfileInput {
		firstName: String!
		lastName: String
		picture: String
	}

	input UpdateUserProfileInput {
		firstName: String
		lastName: String
		picture: String
	}

	input CreateAccount {
		username: String!
		email: String!
		status: Boolean
		password: String
		identificationNumber: String
		profile: CreateUserProfileInput
		role: String
		department: String
		contact: CreateContactInput
	}

	input UpdateAccountInput {
		username: String
		password: String
		identificationNumber: String
		profile: UpdateUserProfileInput
		role: String
		department: String
	}

	extend type Mutation {
		createAccount(input: CreateAccount): User @auth
		deleteAccount(id: String!): Boolean @auth
		updateAccount(id: String!, input: UpdateAccountInput!): User @auth
	}

	extend type Query {
		accounts: [User] @auth
		account(id: String): User @auth
	}
`
