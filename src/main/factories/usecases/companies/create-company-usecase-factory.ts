import { DbCreateCompany } from "@/data/usecases/companies/db-create-company"
import { DbLoadCompanyByCode } from "@/data/usecases/companies/db-load-company-by-code"
import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { CompaniesRepository } from "@/infra/db/prisma/repos/companies-repository"

export const makeCreateCompanyUseCase = (): CreateCompanyUseCase => {
	const uuidAdapter = new UuidAdapter()
	const companiesRepository = new CompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	return new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)
}
