import { DbCreateCompany } from "@/data/usecases/companies/db-create-company";
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { CompaniesRepository } from "@/infra/db/prisma/repos/companies-repository";
import { ContactsRepository } from "@/infra/db/prisma/repos/contacts-repository";
import { CreateCompanyController } from "@/presentation/controllers/companies/create-company-controller";
import { Controller } from "@/presentation/protocols/controller";
import { makeCreateContactValidation } from "../contacts/create-contact-controller-validation";
import { makeCreateCompanyValidation } from "./create-company-controller-validation";

export const makeCreateCompanyController = (): Controller => {
  const uuidAdapter = new UuidAdapter();

  const contactsRepository = new ContactsRepository();
  const createContactUseCase = new DbCreateContact(uuidAdapter, contactsRepository);

  const companiesRepository = new CompaniesRepository()
  const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository)
  return new CreateCompanyController(makeCreateCompanyValidation(), makeCreateContactValidation(), createContactUseCase, createCompany);
}
