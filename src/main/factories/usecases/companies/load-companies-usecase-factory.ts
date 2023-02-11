import { DbLoadCompanies } from "@/data/usecases/companies/db-load-companies"
import { LoadCompaniesUseCase } from "@/domain/usecases/companies/load-companies"
import { CompaniesRepository } from "@/infra/db/prisma/repos/companies-repository"

export const makeLoadCompaniesUseCase = (): LoadCompaniesUseCase => {
	const companiesRepository = new CompaniesRepository()
	return new DbLoadCompanies(companiesRepository)
}
