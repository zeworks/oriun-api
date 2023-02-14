import { apolloControllerAdapter } from "@/main/adapters/apollo-controller"
import { makeCreateAuthenticationController } from "@/main/factories/controllers/authentication/create-authentication-controller-factory"
import { makeLoadAccountByIdController } from "@/main/factories/controllers/users/load-account-by-id-controller-factory"

export default {
	Query: {
		me: (_: any, args: any, context: any) =>
			apolloControllerAdapter(makeLoadAccountByIdController(), args, context),
	},
	Mutation: {
		createAuthentication: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				makeCreateAuthenticationController(),
				args,
				context
			),
	},
}
