import { CompaniesEntity } from "@/domain/entities/companies";
import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company";
import { LoadCompaniesUseCaseFunction } from "@/domain/usecases/companies/load-companies";
import { LoadCompanyByCodeUseCaseFunction } from "@/domain/usecases/companies/load-company-by-code";
import { LoadCompanyByIdUseCaseFunction } from "@/domain/usecases/companies/load-company-by-id";
import { UpdateCompanyUseCaseFunction } from "@/domain/usecases/companies/update-company";
import { CreateCompanyRepository } from "./create-company-repository";
import { LoadCompaniesRepository } from "./load-companies-repository";
import { LoadCompanyByCodeRepository } from "./load-company-by-code-repository";
import { LoadCompanyByIdRepository } from "./load-company-by-id-repository";
import { UpdateCompanyRepository } from "./update-company-repository";

export class InMemoryCompaniesRepository implements CreateCompanyRepository, LoadCompaniesRepository, LoadCompanyByIdRepository, UpdateCompanyRepository, LoadCompanyByCodeRepository {
  private companies: CompaniesEntity[] = [];

  create = async (input: CreateCompanyRepository.Params): Promise<CreateCompanyUseCase.Result> => {
    const data = {
      ...input,
      createdAt: new Date()
    };
    this.companies.push(data);
    return data;
  }

  loadById: LoadCompanyByIdUseCaseFunction = async id => {
    return this.companies.find(c => c.id === id) || null;
  }

  loadByCode: LoadCompanyByCodeUseCaseFunction = async code => {
    return this.companies.find(c => c.code === code) || null;
  }

  loadCompanies: LoadCompaniesUseCaseFunction = async (params) => {
    if (params?.filter?.status !== undefined)
      return this.companies.filter(c => c.status === params?.filter?.status);

    if (params?.pagination)
      return this.companies.slice(params.pagination.skip, Number(params.pagination.take) + 1);

    if (params?.search)
      return this.companies.filter(c => c.id === params.search || c.code.includes(params.search || "") || c.name.includes(params.search || ""));

    if (params?.orderBy)
      return this.companies.sort((a, b) => {

        if (params.orderBy?.key === "ID") {
          if (params.orderBy.sort === "ASC")
            return a.id < b.id ? -1 : 1;
          return b.id < a.id ? -1 : 1;
        }

        if (params.orderBy?.key === "CODE") {
          if (params.orderBy.sort === "ASC")
            return a.code < b.code ? -1 : 1;
          return b.code < a.code ? -1 : 1;
        }

        if (params.orderBy?.key === "NAME") {
          if (params.orderBy.sort === "ASC")
            return a.name < b.name ? -1 : 1;
          return b.name < a.name ? -1 : 1;
        }

        if (params.orderBy?.key === "CREATEDAT") {
          if (params.orderBy.sort === "ASC")
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return a.createdAt! < b.createdAt! ? -1 : 1;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return b.createdAt! < a.createdAt! ? -1 : 1;
        }

        return 0;
      })

    return this.companies;
  }

  update: UpdateCompanyUseCaseFunction = async (input) => {
    const company = this.companies.find(c => c.id === input.id);
    const data = Object.assign({}, company, input);
    return data
  }
}
