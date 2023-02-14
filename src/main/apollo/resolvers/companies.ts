import { PermissionKey } from "@/config/permissions"
import { apolloControllerAdapter } from "@/main/adapters/apollo-controller"
import { AclDecorator } from "@/main/decorators/acl-decorator"
import { makeCreateCompanyController } from "@/main/factories/controllers/companies/create-company-controller-factory"
import { makeDeleteCompanyController } from "@/main/factories/controllers/companies/delete-company-controller-factory"
import { makeLoadCompaniesController } from "@/main/factories/controllers/companies/load-companies-controller-factory"
import { makeLoadCompanyByIdController } from "@/main/factories/controllers/companies/load-company-by-id-controller-factory"
import { makeUpdateCompanyController } from "@/main/factories/controllers/companies/update-company-controller-factory"

export default {
	Query: {
		companies: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeLoadCompaniesController(),
					PermissionKey.CompaniesView
				),
				args,
				context
			),
		company: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeLoadCompanyByIdController(),
					PermissionKey.CompaniesView
				),
				args,
				context
			),
	},
	Mutation: {
		createCompany: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeCreateCompanyController(),
					PermissionKey.CompaniesCreate
				),
				args.input,
				context
			),
		updateCompany: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeUpdateCompanyController(),
					PermissionKey.CompaniesUpdate
				),
				args.input,
				context
			),
		deleteCompany: (_: any, args: any, context: any) =>
			apolloControllerAdapter(
				new AclDecorator(
					makeDeleteCompanyController(),
					PermissionKey.CompaniesDelete
				),
				args,
				context
			),
	},
}
