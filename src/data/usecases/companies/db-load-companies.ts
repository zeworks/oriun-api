import { LoadCompaniesRepository } from "@/data/protocols/repositories/companies/load-companies-repository";
import { LoadCompaniesUseCase, LoadCompaniesUseCaseFunction } from "@/domain/usecases/companies/load-companies";

export class DbLoadCompanies implements LoadCompaniesUseCase {
  constructor(
    private readonly loadCompaniesRepository: LoadCompaniesRepository
  ) { }
  
  loadCompanies: LoadCompaniesUseCaseFunction = async (params) => {
    const result = await this.loadCompaniesRepository.loadCompanies(params);
    return result;
  }
}
