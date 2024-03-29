import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { DbCreateCompany } from "@/data/usecases/companies/db-create-company"
import { DbLoadCompanies } from "@/data/usecases/companies/db-load-companies"
import { DbLoadCompanyByCode } from "@/data/usecases/companies/db-load-company-by-code"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateCompanyValidation } from "@/main/factories/controllers/companies/create-company-controller-validation"
import { expect, test } from "vitest"
import { CreateCompanyController } from "./create-company-controller"
import { LoadCompaniesController } from "./load-companies-controller"

test("Should return a list of companies with success", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()
	const uuidAdapter = new UuidAdapter()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompanyUseCase = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)
	const createCompany = new CreateCompanyController(
		makeCreateCompanyValidation(),
		createCompanyUseCase
	)

	await createCompany.execute({
		code: "code-1",
		name: "company-name",
		contacts: [
			{
				id: "",
				country: "2",
				default: true,
				name: "Contact Name",
				phone: "91632633",
				prefix: "+351",
			},
		],
	})

	const loadCompaniesUseCase = new DbLoadCompanies(companiesRepository)
	const loadCompanies = new LoadCompaniesController(loadCompaniesUseCase)
	const result = await loadCompanies.execute()

	expect(result.data?.length).toEqual(1)
})

test("Should return an empty array if no companies created", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()

	const loadCompaniesUseCase = new DbLoadCompanies(companiesRepository)
	const loadCompanies = new LoadCompaniesController(loadCompaniesUseCase)
	const result = await loadCompanies.execute()

	expect(result.data?.length).toEqual(0)
	expect(result.data).toEqual([])
})

test("Should return a list of companies paginated", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()

	const uuidAdapter = new UuidAdapter()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompanyUseCase = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)
	const createCompany = new CreateCompanyController(
		makeCreateCompanyValidation(),
		createCompanyUseCase
	)

	await createCompany.execute({
		code: "code-1",
		name: "company-name",
		contacts: [
			{
				id: "",
				country: "2",
				default: true,
				name: "Contact Name",
				phone: "91632633",
				prefix: "+351",
			},
		],
	})

	await createCompany.execute({
		code: "code-2",
		name: "company-name",
		contacts: [
			{
				id: "",
				country: "2",
				default: true,
				name: "Contact Name",
				phone: "91632633",
				prefix: "+351",
			},
		],
	})

	await createCompany.execute({
		code: "code-3",
		name: "company-name",
		contacts: [
			{
				id: "",
				country: "2",
				default: true,
				name: "Contact Name",
				phone: "91632633",
				prefix: "+351",
			},
		],
	})

	const loadCompaniesUseCase = new DbLoadCompanies(companiesRepository)
	const loadCompanies = new LoadCompaniesController(loadCompaniesUseCase)
	const result = await loadCompanies.execute({
		pagination: {
			skip: 1,
			take: 2,
		},
	})

	expect(result.data?.length).toEqual(2)
})
