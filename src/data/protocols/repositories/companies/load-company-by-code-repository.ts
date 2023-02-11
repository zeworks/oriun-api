import { LoadCompanyByCodeUseCaseFunction } from "@/domain/usecases/companies/load-company-by-code"

export interface LoadCompanyByCodeRepository {
	loadByCode: LoadCompanyByCodeUseCaseFunction
}
