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

type LoadCompaniesUseCaseOrderBy = {
  key: "ID" | "CODE" | "NAME" | "CREATEDAT",
  sort: "ASC" | "DESC"
}

export namespace LoadCompaniesUseCase {
  export type Params = {
    filter?: LoadCompaniesUseCaseFilter;
    pagination?: LoadCompaniesUseCasePagination;
    search?: string;
    orderBy?: LoadCompaniesUseCaseOrderBy;
  }
  export type Result = Array<CompaniesEntity> | null;
}
