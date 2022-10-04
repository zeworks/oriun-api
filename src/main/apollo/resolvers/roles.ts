import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { makeCreateRoleController } from "@/main/factories/controllers/roles/create-role-controller-factory";

export default {
  Mutation: {
    createRole: (_: any, args: any, context: any) => apolloControllerAdapter(makeCreateRoleController(), args, context)
  }
}
