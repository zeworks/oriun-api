import { DbLoadCompanyByCode } from "@/data/usecases/companies/db-load-company-by-code"
import { LoadCompanyByCodeUseCase } from "@/domain/usecases/companies/load-company-by-code"
import { CompaniesRepository } from "@/infra/db/prisma/repos/companies-repository"

export const makeLoadCompanyByCodeUseCase = (): LoadCompanyByCodeUseCase => {
	const companiesRepository = new CompaniesRepository()
	return new DbLoadCompanyByCode(companiesRepository)
}
