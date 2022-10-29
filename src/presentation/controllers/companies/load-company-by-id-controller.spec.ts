import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository";
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository";
import { DbCreateCompany } from "@/data/usecases/companies/db-create-company";
import { DbLoadCompanyById } from "@/data/usecases/companies/db-load-company-by-id";
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { makeCreateCompanyValidation } from "@/main/factories/controllers/companies/create-company-controller-validation";
import { makeLoadCompanyByIdValidation } from "@/main/factories/controllers/companies/load-company-by-id-controller-validation";
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation";
import { expect, test } from "vitest";
import { CreateCompanyController } from "./create-company-controller";
import { LoadCompanyByIdController } from "./load-company-by-id-controller";

test("Should load company by id with success", async () => {
  const uuidAdapter = new UuidAdapter()
  const companiesRepository = new InMemoryCompaniesRepository();
  const contactsRepository = new InMemoryContactsRepository()

  const createContact = new DbCreateContact(uuidAdapter, contactsRepository);
  const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository);
  
  const createCompanyController = new CreateCompanyController(makeCreateCompanyValidation(), makeCreateContactValidation(), createContact, createCompany);

  const company = await createCompanyController.execute({
    code: "123",
    name: "company",
  })

  const loadCompany = new DbLoadCompanyById(companiesRepository);
  const loadCompanyController = new LoadCompanyByIdController(makeLoadCompanyByIdValidation(), loadCompany);

  if (company.data?.id) {
    
    const result = await loadCompanyController.execute({
      id: company.data.id
    })

    expect(result.data?.code).toEqual("123");
    expect(result.data?.name).toEqual("company");
  }
})
