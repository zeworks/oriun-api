import { CompaniesEntity } from "@/domain/entities/companies"

export interface LoadCompanyByIdUseCase {
  loadById: LoadCompanyByIdUseCaseFunction
}

export type LoadCompanyByIdUseCaseFunction = (id: string) => Promise<LoadCompanyByIdUseCase.Result>;

export namespace LoadCompanyByIdUseCase {
  export type Result = CompaniesEntity | null;
}
