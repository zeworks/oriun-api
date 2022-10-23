import { CompaniesEntity } from "@/domain/entities/companies";
import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company";
import { LoadCompaniesUseCaseFunction } from "@/domain/usecases/companies/load-companies";
import { CreateCompanyRepository } from "./create-company-repository";
import { LoadCompaniesRepository } from "./load-companies-repository";

export class InMemoryCompaniesRepository implements CreateCompanyRepository, LoadCompaniesRepository {
  private companies: CompaniesEntity[] = [];

  create = async (input: CreateCompanyRepository.Params): Promise<CreateCompanyUseCase.Result> => {
    const data = {
      ...input,
      createdAt: new Date()
    };
    this.companies.push(data);
    return data;
  }

  loadCompanies: LoadCompaniesUseCaseFunction = async (params) => {
    if (params?.filter?.status !== undefined)
      return this.companies.filter(c => c.status === params?.filter?.status);
    
    if (params?.pagination)
      return this.companies.slice(params.pagination.skip, Number(params.pagination.take) + 1);
    
    return this.companies;
  }
}
