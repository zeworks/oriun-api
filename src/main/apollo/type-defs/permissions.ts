import { gql } from "apollo-server"

export default gql`
	type Permission {
		id: String!
		name: String!
		key: String!
		status: Boolean!
		parent: String
		createdAt: DateTime!
	}
`
