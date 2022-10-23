import { PermissionKey } from "@/config/permissions";
import { apolloControllerAdapter } from "@/main/adapters/apollo-controller";
import { AclDecorator } from "@/main/decorators/acl-decorator";
import { makeCreateCompanyController } from "@/main/factories/controllers/companies/create-company-controller-factory";
import { makeLoadCompaniesController } from "@/main/factories/controllers/companies/load-companies-controller-factory";

export default {
  Query: {
    companies: (_: any, args: any, context: any) => apolloControllerAdapter(new AclDecorator(makeLoadCompaniesController(), PermissionKey.CompaniesView), args, context),
  },
  Mutation: {
    createCompany: (_: any, args: any, context: any) => apolloControllerAdapter(new AclDecorator(makeCreateCompanyController(), PermissionKey.CompaniesCreate), args.input, context),
  }
}