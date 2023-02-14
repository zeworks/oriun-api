import { DeleteCompanyUseCaseFunction } from "@/domain/usecases/companies/delete-company"

export interface DeleteCompanyRepository {
	delete: DeleteCompanyUseCaseFunction
}
