import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { ContactsRepository } from "@/infra/db/prisma/repos/contacts-repository";
import { makeCreateCompanyValidation } from "@/main/factories/controllers/companies/create-company-controller-validation";
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation";
import { CreateCompanyController } from "@/presentation/controllers/companies/create-company-controller";
import { expect, test } from "vitest";
import { DbCreateContact } from "../contacts/db-create-contact";
import { DbCreateCompany } from "./db-create-company";
import { DbLoadCompanyById } from "./db-load-company-by-id";

test("Should load company by id with success", async () => {
  const uuidAdapter = new UuidAdapter()
  const companiesRepository = new InMemoryCompaniesRepository()
  const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository);
  const contactsRepository = new ContactsRepository()
  const createContact = new DbCreateContact(uuidAdapter, contactsRepository);
  const createCompanyController = new CreateCompanyController(makeCreateCompanyValidation(), makeCreateContactValidation(), createContact, createCompany);
  const loadCompany = new DbLoadCompanyById(companiesRepository);

  const company = await createCompanyController.execute({
    code: "123",
    name: "Company name"
  });

  if (company.data?.id) {
    const result = await loadCompany.loadById(company.data?.id);

    expect(result).not.toBeUndefined();
    expect(result?.code).toEqual("123");
  }
})

test("Should throw an error if invalid id", async () => {
  const companiesRepository = new InMemoryCompaniesRepository()
  const loadCompany = new DbLoadCompanyById(companiesRepository);

  try {
    await loadCompany.loadById("123")
  } catch (error) {
    expect(error).toEqual(new Error("invalid id"));
  }
})
