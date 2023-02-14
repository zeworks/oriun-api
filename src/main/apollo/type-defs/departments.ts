import { gql } from "apollo-server"

export default gql`
	type Department {
		id: String!
		name: String!
		status: Boolean!
		createdAt: DateTime!
	}

	input CreateDepartmentInput {
		name: String!
		status: Boolean!
	}

	input UpdateDepartmentInput {
		name: String
		status: Boolean
	}

	type Query {
		departments(status: Boolean): [Department] @auth
		department(id: String!): Department @auth
	}

	type Mutation {
		createDepartment(input: CreateDepartmentInput): Department @auth
		updateDepartment(id: String!, input: UpdateDepartmentInput): Department
			@auth
		deleteDepartment(id: String!): Boolean @auth
	}
`
