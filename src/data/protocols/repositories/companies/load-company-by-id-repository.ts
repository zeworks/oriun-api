import { LoadCompanyByIdUseCaseFunction } from "@/domain/usecases/companies/load-company-by-id";

export interface LoadCompanyByIdRepository {
  loadById: LoadCompanyByIdUseCaseFunction
}
