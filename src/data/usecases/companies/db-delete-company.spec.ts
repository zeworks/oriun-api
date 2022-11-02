import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { expect, test } from "vitest";
import { DbCreateCompany } from "./db-create-company";
import { DbDeleteCompany } from "./db-delete-company";

test("Should delete company with success", async () => {
  const uuidAdapter = new UuidAdapter();
  const companiesRepository = new InMemoryCompaniesRepository();
  const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository);
  const deleteCompany = new DbDeleteCompany(companiesRepository, companiesRepository)

  await createCompany.create({
    code: "code-1",
    name: "company name",
  })

  const company = await createCompany.create({
    code: "code-2",
    name: "company name 2",
  })

  const result = await deleteCompany.delete(company?.id!);

  expect(result).toBeTruthy()
})

test("Should throw an error if invalid company id", async () => {
  const companiesRepository = new InMemoryCompaniesRepository();
  const deleteCompany = new DbDeleteCompany(companiesRepository, companiesRepository)
  expect(deleteCompany.delete("123")).rejects.toEqual(new Error("invalid company id"))
})
