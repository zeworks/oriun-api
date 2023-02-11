import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateCompany } from "./db-create-company"

test("Should create company with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new InMemoryCompaniesRepository()
	const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository)

	const result = await createCompany.create({
		code: "code-1",
		name: "company name",
	})

	expect(result?.name).toEqual("company name")
	expect(result?.status).toEqual(true)
})
