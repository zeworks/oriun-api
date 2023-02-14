import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateCompany } from "./db-create-company"
import { DbLoadCompanyById } from "./db-load-company-by-id"

test("Should load company by id with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository)
	const loadCompany = new DbLoadCompanyById(companiesRepository)

	const company = await createCompany.create({
		code: "123",
		name: "Company name",
	})

	if (company?.id) {
		const result = await loadCompany.loadById(company?.id)

		expect(result).not.toBeUndefined()
		expect(result?.code).toEqual("123")
	}
})

test("Should throw an error if invalid id", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()
	const loadCompany = new DbLoadCompanyById(companiesRepository)

	try {
		await loadCompany.loadById("123")
	} catch (error) {
		expect(error).toEqual(new Error("invalid id"))
	}
})
