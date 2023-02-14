import { UpdateCompanyUseCaseFunction } from "@/domain/usecases/companies/update-company"

export interface UpdateCompanyRepository {
	update: UpdateCompanyUseCaseFunction
}
