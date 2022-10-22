import { LoadCompaniesUseCaseFunction } from "@/domain/usecases/companies/load-companies";

export interface LoadCompaniesRepository {
  loadCompanies: LoadCompaniesUseCaseFunction
}
