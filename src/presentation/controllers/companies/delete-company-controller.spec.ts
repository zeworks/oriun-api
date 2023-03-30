import { CompanyIdInvalidError } from "@/data/errors/companies-error"
import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { DbCreateCompany } from "@/data/usecases/companies/db-create-company"
import { DbDeleteCompany } from "@/data/usecases/companies/db-delete-company"
import { DbLoadCompanyByCode } from "@/data/usecases/companies/db-load-company-by-code"
import { DbLoadCompanyById } from "@/data/usecases/companies/db-load-company-by-id"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateCompanyValidation } from "@/main/factories/controllers/companies/create-company-controller-validation"
import { makeDeleteCompanyValidation } from "@/main/factories/controllers/companies/delete-company-controller-validation"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"
import { expect, test } from "vitest"
import { CreateCompanyController } from "./create-company-controller"
import { DeleteCompanyController } from "./delete-company-controller"

test("Should delete company with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)
	const deleteCompany = new DbDeleteCompany(
		companiesRepository,
		companiesRepository
	)

	const createCompanyController = new CreateCompanyController(
		makeCreateCompanyValidation(),
		createCompany
	)
	const deleteCompanyController = new DeleteCompanyController(
		makeDeleteCompanyValidation(),
		deleteCompany
	)

	const company = await createCompanyController.execute({
		code: "123",
		name: "company",
		contacts: [
			{
				id: "",
				country: "Portugal",
				default: true,
				name: "contact name",
				phone: "912345671",
				prefix: "+351",
			},
		],
	})

	const result = await deleteCompanyController.execute({
		id: company.data?.id!,
	})

	expect(result.data).toEqual(true)
})

test("Should throw an error if invalid company id", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()
	const deleteCompany = new DbDeleteCompany(
		new DbLoadCompanyById(companiesRepository),
		companiesRepository
	)

	const deleteCompanyController = new DeleteCompanyController(
		makeDeleteCompanyValidation(),
		deleteCompany
	)

	const result = await deleteCompanyController.execute({
		id: "123",
	})

	expect(result.data).toEqual(new CompanyIdInvalidError())
})
