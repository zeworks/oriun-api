import { DbUpdateCompany } from "@/data/usecases/companies/db-update-company"
import { UpdateCompanyUseCase } from "@/domain/usecases/companies/update-company"
import { CompaniesRepository } from "@/infra/db/prisma/repos/companies-repository"

export const makeUpdateCompanyUseCase = (): UpdateCompanyUseCase => {
	const companiesRepository = new CompaniesRepository()
	return new DbUpdateCompany(companiesRepository, companiesRepository)
}
