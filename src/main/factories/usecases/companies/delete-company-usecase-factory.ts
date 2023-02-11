import { DbDeleteCompany } from "@/data/usecases/companies/db-delete-company"
import { DeleteCompanyUseCase } from "@/domain/usecases/companies/delete-company"
import { CompaniesRepository } from "@/infra/db/prisma/repos/companies-repository"

export const makeDeleteCompanyUseCase = (): DeleteCompanyUseCase => {
	const companiesRepository = new CompaniesRepository()
	return new DbDeleteCompany(companiesRepository, companiesRepository)
}
