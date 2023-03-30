import { PermissionKey } from "@/config/permissions"
import { apolloControllerAdapter } from "@/main/adapters/apollo-controller"
import { AclDecorator } from "@/main/decorators/acl-decorator"
import { makeCreateRoleController } from "@/main/factories/controllers/roles/create-role-controller-factory"

export default {
	Mutation: {
		createRole: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(makeCreateRoleController(), PermissionKey.RolesCreate),
				args.input,
				context
			),
	},
}
