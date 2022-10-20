import { PermissionKey } from "@/config/permissions";
import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { AclDecorator } from "@/main/decorators/acl-decorator";
import { makeCreateAccountController } from "@/main/factories/controllers/users/create-account-controller-factory";

export default {
  Mutation: {
    createAccount: (_: any, args: any, context: any) => apolloControllerAdapter(new AclDecorator(makeCreateAccountController(), PermissionKey.UsersCreate), args, context)
  }
}
