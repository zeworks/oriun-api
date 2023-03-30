import { CompanyCodeAlreadyExistsError } from "@/data/errors/companies-error"
import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { DbCreateCompany } from "@/data/usecases/companies/db-create-company"
import { DbLoadCompanyByCode } from "@/data/usecases/companies/db-load-company-by-code"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateCompanyValidation } from "@/main/factories/controllers/companies/create-company-controller-validation"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { expect, test } from "vitest"
import { CreateContactController } from "../contacts/create-contact-controller"
import { CreateCompanyController } from "./create-company-controller"

test("Should create company with success", async () => {
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

	const result = await createCompanyController.execute({
		code: "code-1",
		name: "company name",
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

	expect(result.statusCode).toEqual(200)
	expect(result.data?.code).toEqual("code-1")
	expect(result.data?.contacts?.[0].country).toEqual("Portugal")
})

test("Should throw an error if empty code value", async () => {
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

	const result = await createCompanyController.execute({
		code: "",
		name: "company name",
		contacts: [
			{
				id: "",
				country: "",
				default: true,
				name: "contact name",
				phone: "912345671",
				prefix: "+351",
			},
		],
	})

	expect(result.statusCode).toEqual(400)
	expect(result.data).toEqual(new MissingParamError("code"))
})

test("Should throw an error if company code already exists", async () => {
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

	const firstCompany = await createCompanyController.execute({
		code: "code-1",
		name: "company name",
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

	expect(firstCompany.statusCode).toEqual(200)
	expect(firstCompany.data?.code).toEqual("code-1")
	expect(firstCompany.data?.contacts?.[0].country).toEqual("Portugal")

	const result = await createCompanyController.execute({
		code: "code-1",
		name: "company name",
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

	expect(result.data).toEqual(new CompanyCodeAlreadyExistsError())
})
