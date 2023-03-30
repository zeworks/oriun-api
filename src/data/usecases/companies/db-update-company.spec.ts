import { CompanyIdInvalidError } from "@/data/errors/companies-error"
import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateCompany } from "./db-create-company"
import { DbLoadCompanyByCode } from "./db-load-company-by-code"
import { DbLoadCompanyById } from "./db-load-company-by-id"
import { DbUpdateCompany } from "./db-update-company"

test("Should update company code with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyById = new DbLoadCompanyById(companiesRepository)
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const createCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)
	const updateCompany = new DbUpdateCompany(
		dbLoadCompanyById,
		companiesRepository
	)

	const company = await createCompany.create({
		code: "123",
		name: "company teste 1",
	})

	const result = await updateCompany.update({
		id: company?.id!,
		code: "321",
	})

	expect(result?.code).toEqual("321")
})

test("Should throw an error if invalid company id", async () => {
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyById = new DbLoadCompanyById(companiesRepository)
	const updateCompany = new DbUpdateCompany(
		dbLoadCompanyById,
		companiesRepository
	)

	expect(
		updateCompany.update({
			id: "123",
			code: "321",
		})
	).rejects.toEqual(new CompanyIdInvalidError())
})
