import { PermissionKey } from "@/config/permissions"
import { apolloControllerAdapter } from "@/main/adapters/apollo-controller"
import { AclDecorator } from "@/main/decorators/acl-decorator"
import { makeCreateClientController } from "@/main/factories/controllers/clients/create-client-controller-factory"
import { makeDeleteClientController } from "@/main/factories/controllers/clients/delete-client-controller-factory"
import { makeLoadClientByIdController } from "@/main/factories/controllers/clients/load-client-id-controller-factory"
import { makeLoadClientsController } from "@/main/factories/controllers/clients/load-clients-controller-factory"
import { makeUpdateClientController } from "@/main/factories/controllers/clients/update-client-controller-factory"

export default {
	Query: {
		client: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeLoadClientByIdController(),
					PermissionKey.ClientsView
				),
				args,
				context
			),
		clients: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeLoadClientsController(),
					PermissionKey.ClientsView
				),
				args,
				context
			),
	},
	Mutation: {
		createClient: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeCreateClientController(),
					PermissionKey.ClientsCreate
				),
				args.input,
				context
			),
		updateClient: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeUpdateClientController(),
					PermissionKey.ClientsUpdate
				),
				args.input,
				context
			),
		deleteClient: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeDeleteClientController(),
					PermissionKey.ClientsDelete
				),
				args,
				context
			),
	},
}
