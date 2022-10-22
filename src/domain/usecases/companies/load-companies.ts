import { CompaniesEntity } from "@/domain/entities/companies";

export interface LoadCompaniesUseCase {
  loadCompanies: LoadCompaniesUseCaseFunction
}

export type LoadCompaniesUseCaseFunction = (params?: LoadCompaniesUseCase.Params) => Promise<LoadCompaniesUseCase.Result>;

type LoadCompaniesUseCaseFilter = {
  status?: boolean;
}

export namespace LoadCompaniesUseCase {
  export type Params = {
    filter?: LoadCompaniesUseCaseFilter;
  }
  export type Result = Array<CompaniesEntity> | null;
}
