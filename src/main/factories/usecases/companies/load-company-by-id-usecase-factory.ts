import { DbLoadCompanyById } from "@/data/usecases/companies/db-load-company-by-id"
import { LoadCompanyByIdUseCase } from "@/domain/usecases/companies/load-company-by-id"
import { CompaniesRepository } from "@/infra/db/prisma/repos/companies-repository"

export const makeLoadCompanyByIdUseCase = (): LoadCompanyByIdUseCase => {
	const companiesRepository = new CompaniesRepository()
	return new DbLoadCompanyById(companiesRepository)
}
