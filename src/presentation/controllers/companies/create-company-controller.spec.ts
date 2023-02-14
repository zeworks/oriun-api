import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { DbCreateCompany } from "@/data/usecases/companies/db-create-company"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateCompanyValidation } from "@/main/factories/controllers/companies/create-company-controller-validation"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { expect, test } from "vitest"
import { CreateCompanyController } from "./create-company-controller"

test("Should create company with success", async () => {
	const uuidAdapter = new UuidAdapter()

	const contactsRepository = new InMemoryContactsRepository()
	const createContactUseCase = new DbCreateContact(
		uuidAdapter,
		contactsRepository
	)

	const companiesRepository = new InMemoryCompaniesRepository()
	const createCompanyUseCase = new DbCreateCompany(
		uuidAdapter,
		companiesRepository
	)
	const createCompanyController = new CreateCompanyController(
		makeCreateCompanyValidation(),
		makeCreateContactValidation(),
		createContactUseCase,
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

	const contactsRepository = new InMemoryContactsRepository()
	const createContactUseCase = new DbCreateContact(
		uuidAdapter,
		contactsRepository
	)

	const companiesRepository = new InMemoryCompaniesRepository()
	const createCompanyUseCase = new DbCreateCompany(
		uuidAdapter,
		companiesRepository
	)
	const createCompanyController = new CreateCompanyController(
		makeCreateCompanyValidation(),
		makeCreateContactValidation(),
		createContactUseCase,
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

test("Should throw an error if empty value on contacts array", async () => {
	const uuidAdapter = new UuidAdapter()

	const contactsRepository = new InMemoryContactsRepository()
	const createContactUseCase = new DbCreateContact(
		uuidAdapter,
		contactsRepository
	)

	const companiesRepository = new InMemoryCompaniesRepository()
	const createCompanyUseCase = new DbCreateCompany(
		uuidAdapter,
		companiesRepository
	)
	const createCompanyController = new CreateCompanyController(
		makeCreateCompanyValidation(),
		makeCreateContactValidation(),
		createContactUseCase,
		createCompanyUseCase
	)

	const result = await createCompanyController.execute({
		code: "code-1",
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
	expect(result.data).toEqual(new MissingParamError("country"))
})
