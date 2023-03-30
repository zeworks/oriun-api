import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateCompany } from "./db-create-company"
import { DbLoadCompanies } from "./db-load-companies"
import { DbLoadCompanyByCode } from "./db-load-company-by-code"

test("Should return a list of companies with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "code-1",
		name: "company name 1",
	})

	await createCompany.create({
		code: "code-2",
		name: "company name 2",
	})

	const result = await loadCompanies.loadCompanies()
	expect(result?.length).toEqual(2)
})

test("Should return a list of companies that are active (status as true) with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "code-1",
		name: "company name 1",
	})

	await createCompany.create({
		code: "code-2",
		name: "company name 2",
		status: false,
	})

	const result = await loadCompanies.loadCompanies({ filter: { status: true } })
	expect(result?.length).toEqual(1)
})

test("Should return an empty list with success", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()
	const loadCompanies = new DbLoadCompanies(companiesRepository)

	const result = await loadCompanies.loadCompanies()
	expect(result).toEqual([])
})

test("Should get 2 companies starting from second of the list", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "code-1",
		name: "company name 1",
	})

	await createCompany.create({
		code: "code-2",
		name: "company name 2",
	})

	await createCompany.create({
		code: "code-3",
		name: "company name 3",
	})

	await createCompany.create({
		code: "code-4",
		name: "company name 4",
	})

	await createCompany.create({
		code: "code-5",
		name: "company name 5",
	})

	const result = await loadCompanies.loadCompanies({
		pagination: { skip: 1, take: 3 },
	})
	expect(result?.length).toEqual(3)
})

test("Should return a list of companies that contains the code 'test'", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "code-teste-1",
		name: "company name 1",
	})

	await createCompany.create({
		code: "code-2",
		name: "company name 2",
		status: false,
	})

	await createCompany.create({
		code: "code-3-test",
		name: "company name 2",
		status: false,
	})

	const result = await loadCompanies.loadCompanies({ search: "test" })
	expect(result?.length).toEqual(2)
})

test("Should return a list of companies that contains the name 'test'", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "code-teste-1",
		name: "company name 1",
	})

	await createCompany.create({
		code: "code-2",
		name: "company test",
		status: false,
	})

	await createCompany.create({
		code: "code-3-test",
		name: "company name 2",
		status: false,
	})

	const result = await loadCompanies.loadCompanies({ search: "test" })
	expect(result?.length).toEqual(3)
})

test("Should search by id with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "code-teste-1",
		name: "company name 1",
	})

	const company = await createCompany.create({
		code: "code-2",
		name: "company test",
		status: false,
	})

	await createCompany.create({
		code: "code-3-test",
		name: "company name 2",
		status: false,
	})

	const result = await loadCompanies.loadCompanies({ search: company?.id })
	expect(result?.length).toEqual(1)
})

test("Should return an empty list with success", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()
	const loadCompanies = new DbLoadCompanies(companiesRepository)

	const result = await loadCompanies.loadCompanies()
	expect(result).toEqual([])
})

test("Should order by id with success ASC", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "code-teste-1",
		name: "company name 1",
	})

	await createCompany.create({
		code: "code-2",
		name: "company test",
		status: false,
	})

	await createCompany.create({
		code: "code-3-test",
		name: "company name 2",
		status: false,
	})

	const result = await loadCompanies.loadCompanies({
		orderBy: { key: "ID", sort: "ASC" },
	})
	expect(result?.length).toEqual(3)
})

test("Should order by CODE with success ASC", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "a",
		name: "company name 1",
	})

	await createCompany.create({
		code: "c",
		name: "company test",
		status: false,
	})

	await createCompany.create({
		code: "b",
		name: "company name 2",
		status: false,
	})

	const result = await loadCompanies.loadCompanies({
		orderBy: { key: "CODE", sort: "ASC" },
	})
	expect(result?.length).toEqual(3)
})

test("Should order by NAME with success ASC", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "a",
		name: "company name 1",
	})

	await createCompany.create({
		code: "c",
		name: "company name 3",
		status: false,
	})

	await createCompany.create({
		code: "b",
		name: "company name 2",
		status: false,
	})

	const result = await loadCompanies.loadCompanies({
		orderBy: { key: "NAME", sort: "ASC" },
	})
	expect(result?.length).toEqual(3)
	expect(result?.[0].code).toEqual("a")
	expect(result?.[1].code).toEqual("b")
	expect(result?.[2].code).toEqual("c")
})

test("Should order by NAME with success DESC", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const loadCompanies = new DbLoadCompanies(companiesRepository)

	await createCompany.create({
		code: "a",
		name: "company name 1",
	})

	await createCompany.create({
		code: "c",
		name: "company name 3",
		status: false,
	})

	await createCompany.create({
		code: "b",
		name: "company name 2",
		status: false,
	})

	const result = await loadCompanies.loadCompanies({
		orderBy: { key: "NAME", sort: "DESC" },
	})
	expect(result?.length).toEqual(3)
	expect(result?.[0].code).toEqual("c")
	expect(result?.[1].code).toEqual("b")
	expect(result?.[2].code).toEqual("a")
})
