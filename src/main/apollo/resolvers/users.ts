import { PermissionKey } from "@/config/permissions";
import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { AclResolver } from "@/main/decorators/acl-resolver";
import { makeCreateAccountController } from "@/main/factories/controllers/users/create-account-controller-factory";

export default {
  Mutation: {
    createAccount: (_: any, args: any, context: any) => apolloControllerAdapter(new AclResolver(makeCreateAccountController(), PermissionKey.UsersCreate), args, context)
  }
}
