import { DbCreateCompany } from "@/data/usecases/companies/db-create-company";
import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { CompaniesRepository } from "@/infra/db/prisma/repos/companies-repository";

export const makeCreateCompanyUseCase = (): CreateCompanyUseCase => {
  const uuidAdapter = new UuidAdapter();
  const companiesRepository = new CompaniesRepository()
  return new DbCreateCompany(uuidAdapter, companiesRepository)
}
