import { CompanyCodeInvalidError } from "@/data/errors/companies-error"
import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { DbCreateCompany } from "@/data/usecases/companies/db-create-company"
import { DbLoadCompanyByCode } from "@/data/usecases/companies/db-load-company-by-code"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateCompanyValidation } from "@/main/factories/controllers/companies/create-company-controller-validation"
import { makeLoadCompanyByCodeValidation } from "@/main/factories/controllers/companies/load-company-by-code-controller-validation"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"
import { expect, test } from "vitest"
import { CreateCompanyController } from "./create-company-controller"
import { LoadCompanyByCodeController } from "./load-company-by-code-controller"

test("Should load the company by code with success", async () => {
	const uuidAdapter = new UuidAdapter()

	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompanyUseCase = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)
	const createCompanyController = new CreateCompanyController(
		makeCreateCompanyValidation(),
		createCompanyUseCase
	)

	const loadCompanyByCodeUseCase = new DbLoadCompanyByCode(companiesRepository)
	const loadCompanyByCodeController = new LoadCompanyByCodeController(
		makeLoadCompanyByCodeValidation(),
		loadCompanyByCodeUseCase
	)

	const company = await createCompanyController.execute({
		code: "123",
		name: "teste",
	})

	const result = await loadCompanyByCodeController.execute({
		code: company.data?.code!,
	})

	expect(result.data?.code).toEqual("123")
})

test("Should throw an error if invalid company code", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()
	const loadCompanyByCodeUseCase = new DbLoadCompanyByCode(companiesRepository)
	const loadCompanyByCodeController = new LoadCompanyByCodeController(
		makeLoadCompanyByCodeValidation(),
		loadCompanyByCodeUseCase
	)

	const result = await loadCompanyByCodeController.execute({
		code: "123",
	})

	expect(result.data).toEqual(new CompanyCodeInvalidError())
})
