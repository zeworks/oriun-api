import { gql } from "apollo-server"

export default gql`
	type Authentication {
		accessToken: String!
	}

	extend type Query {
		me: User @auth
	}

	extend type Mutation {
		createAuthentication(email: String, password: String): Authentication
		deleteAuthentication: Boolean @auth
	}
`
