import { apolloControllerAdapter } from "@/main/adapters/apollo-controller"
import { makeCreateAuthenticationController } from "@/main/factories/controllers/authentication/create-authentication-controller-factory"
import { makeDeleteAuthenticationController } from "@/main/factories/controllers/authentication/delete-authentication-controller-factory"
import { makeLoadAccountByContextIdController } from "@/main/factories/controllers/users/load-account-by-context-id-controller-factory"

export default {
	Query: {
		me: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				makeLoadAccountByContextIdController(),
				args,
				context
			),
	},
	Mutation: {
		createAuthentication: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				makeCreateAuthenticationController(),
				args,
				context
			),
		deleteAuthentication: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				makeDeleteAuthenticationController(),
				args,
				context
			),
	},
}
