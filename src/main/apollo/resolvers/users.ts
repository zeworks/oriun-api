import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { makeCreateAccountController } from "@/main/factories/controllers/users/create-account-controller-factory";

export default {
  Mutation: {
    createAccount: (_: any, args: any, context: any) => apolloControllerAdapter(makeCreateAccountController(), args, context)
  }
}
