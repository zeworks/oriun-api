import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { DbCreateCompany } from "@/data/usecases/companies/db-create-company"
import { DbUpdateCompany } from "@/data/usecases/companies/db-update-company"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { DbUpdateContact } from "@/data/usecases/contacts/db-update-contact"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateCompanyValidation } from "@/main/factories/controllers/companies/create-company-controller-validation"
import { makeUpdateCompanyValidation } from "@/main/factories/controllers/companies/update-company-controller-validation"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"
import { expect, test } from "vitest"
import { CreateCompanyController } from "./create-company-controller"
import { UpdateCompanyController } from "./update-company-controller"

test("Should update company with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const contactsRepository = new InMemoryContactsRepository()

	const createContact = new DbCreateContact(uuidAdapter, contactsRepository)
	const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository)
	const updateContactUseCase = new DbUpdateContact(
		contactsRepository,
		contactsRepository
	)
	const updateCompanyUseCase = new DbUpdateCompany(
		companiesRepository,
		companiesRepository
	)

	const createCompanyController = new CreateCompanyController(
		makeCreateCompanyValidation(),
		makeCreateContactValidation(),
		createContact,
		createCompany
	)
	const updateCompanyController = new UpdateCompanyController(
		makeUpdateCompanyValidation(),
		makeCreateContactValidation(),
		createContact,
		updateContactUseCase,
		updateCompanyUseCase
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

	const result = await updateCompanyController.execute({
		id: company.data?.id!,
		code: "321",
		contacts: [
			...(company.data?.contacts || []),
			{
				id: "",
				country: "Portugal",
				default: false,
				name: "contact name 2",
				phone: "912345672",
				prefix: "+222",
			},
		],
	})

	expect(result.data?.code).toEqual("321")
	expect(result.data?.contacts?.length).toEqual(2)
})

test("Should update company contact country with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const contactsRepository = new InMemoryContactsRepository()

	const createContact = new DbCreateContact(uuidAdapter, contactsRepository)
	const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository)
	const updateContactUseCase = new DbUpdateContact(
		contactsRepository,
		contactsRepository
	)
	const updateCompanyUseCase = new DbUpdateCompany(
		companiesRepository,
		companiesRepository
	)

	const createCompanyController = new CreateCompanyController(
		makeCreateCompanyValidation(),
		makeCreateContactValidation(),
		createContact,
		createCompany
	)
	const updateCompanyController = new UpdateCompanyController(
		makeUpdateCompanyValidation(),
		makeCreateContactValidation(),
		createContact,
		updateContactUseCase,
		updateCompanyUseCase
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

	const result = await updateCompanyController.execute({
		id: company.data?.id!,
		code: "321",
		contacts: [
			{
				...company.data?.contacts?.[0]!,
				country: "France",
			},
		],
	})

	expect(result.data?.code).toEqual("321")
	expect(result.data?.contacts?.length).toEqual(1)
	expect(result.data?.contacts?.[0].country).toEqual("France")
})

test("Should update company cleaning the contacts with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const contactsRepository = new InMemoryContactsRepository()

	const createContact = new DbCreateContact(uuidAdapter, contactsRepository)
	const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository)
	const updateContactUseCase = new DbUpdateContact(
		contactsRepository,
		contactsRepository
	)
	const updateCompanyUseCase = new DbUpdateCompany(
		companiesRepository,
		companiesRepository
	)

	const createCompanyController = new CreateCompanyController(
		makeCreateCompanyValidation(),
		makeCreateContactValidation(),
		createContact,
		createCompany
	)
	const updateCompanyController = new UpdateCompanyController(
		makeUpdateCompanyValidation(),
		makeCreateContactValidation(),
		createContact,
		updateContactUseCase,
		updateCompanyUseCase
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

	const result = await updateCompanyController.execute({
		id: company.data?.id!,
		code: "321",
		contacts: [],
	})

	expect(result.data?.code).toEqual("321")
	expect(result.data?.contacts?.length).toEqual(0)
})
