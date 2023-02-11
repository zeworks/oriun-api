import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateCompany } from "./db-create-company"
import { DbLoadCompanyByCode } from "./db-load-company-by-code"

test("Should load company by code with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository)
	const loadByCode = new DbLoadCompanyByCode(companiesRepository)

	const company = await createCompany.create({
		code: "123",
		name: "company teste 1",
	})

	const result = await loadByCode.loadByCode("123")
	expect(result?.code).toEqual("123")
})

test("Should throw an error if invalid company code", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()
	const loadByCode = new DbLoadCompanyByCode(companiesRepository)

	expect(loadByCode.loadByCode("123")).rejects.toEqual(
		new Error("invalid code")
	)
})
