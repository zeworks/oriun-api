import { PermissionKey } from "@/config/permissions";
import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { AclResolver } from "@/main/decorators/acl-resolver";
import { makeCreateRoleController } from "@/main/factories/controllers/roles/create-role-controller-factory";

export default {
  Mutation: {
    createRole: (_: any, args: any, context: any) => apolloControllerAdapter(new AclResolver(makeCreateRoleController(), PermissionKey.RolesCreate), args, context)
  }
}
