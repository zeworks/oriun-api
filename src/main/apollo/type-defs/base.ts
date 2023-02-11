import { gql } from "apollo-server-express"

export default gql`
	scalar DateTime
	directive @auth on FIELD_DEFINITION | FIELD

	type Query {
		_: String
	}
	type Mutation {
		_: String
	}
`
