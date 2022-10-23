import { CompaniesEntity } from "@/domain/entities/companies";

export interface LoadCompaniesUseCase {
  loadCompanies: LoadCompaniesUseCaseFunction
}

export type LoadCompaniesUseCaseFunction = (params?: LoadCompaniesUseCase.Params) => Promise<LoadCompaniesUseCase.Result>;

type LoadCompaniesUseCaseFilter = {
  status?: boolean;
}

type LoadCompaniesUseCasePagination = {
  skip?: number;
  take?: number;
}

export namespace LoadCompaniesUseCase {
  export type Params = {
    filter?: LoadCompaniesUseCaseFilter;
    pagination?: LoadCompaniesUseCasePagination;
  }
  export type Result = Array<CompaniesEntity> | null;
}
