import { CompanyCodeAlreadyExistsError } from "@/data/errors/companies-error"
import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateCompany } from "./db-create-company"
import { DbLoadCompanyByCode } from "./db-load-company-by-code"

test("Should create company with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	const result = await createCompany.create({
		code: "code-1",
		name: "company name",
	})

	expect(result?.name).toEqual("company name")
	expect(result?.status).toEqual(true)
})

test("Should throw an error if company code already exists", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)

	await createCompany.create({
		code: "code-1",
		name: "company name",
	})

	expect(
		createCompany.create({
			code: "code-1",
			name: "company name",
		})
	).rejects.toEqual(new CompanyCodeAlreadyExistsError())
})
