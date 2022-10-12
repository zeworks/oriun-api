import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { makeCreateAuthenticationController } from "@/main/factories/controllers/authentication/create-authentication-controller-factory";

export default {
  Mutation: {
    createAuthentication: (_: any, args: any, context: any) => apolloControllerAdapter(makeCreateAuthenticationController(), args, context)
  }
}
