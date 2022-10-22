import { CompaniesEntity } from "@/domain/entities/companies"

export interface CreateCompanyUseCase {
  create: CreateCompanyUseCaseFunction
}

export type CreateCompanyUseCaseFunction = (input: CreateCompanyUseCase.Params) => Promise<CreateCompanyUseCase.Result>;

export namespace CreateCompanyUseCase {
  export type Params = Omit<CompaniesEntity, "id">;

  export type Result = CompaniesEntity | null;
}
