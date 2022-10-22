import { CompaniesEntity } from "@/domain/entities/companies";
import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company";
import { CreateCompanyRepository } from "./create-company-repository";

export class InMemoryCompaniesRepository implements CreateCompanyRepository {
  private companies: CompaniesEntity[] = [];

  create = async (input: CreateCompanyRepository.Params): Promise<CreateCompanyUseCase.Result> => {
    const data = {
      ...input,
      createdAt: new Date()
    };
    this.companies.push(data);
    return data;
  }
}
