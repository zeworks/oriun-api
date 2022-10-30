import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { expect, test } from "vitest";
import { DbCreateCompany } from "./db-create-company";
import { DbUpdateCompany } from "./db-update-company";

test("Should update company code with success", async () => {
  const uuidAdapter = new UuidAdapter()
  const companiesRepository = new InMemoryCompaniesRepository()
  const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository);
  const updateCompany = new DbUpdateCompany(companiesRepository, companiesRepository);

  const company = await createCompany.create({
    code: "123",
    name: "company teste 1"
  });

  const result = await updateCompany.update({
    id: company?.id!,
    code: "321"
  });

  expect(result?.code).toEqual("321");
})

test("Should throw an error if invalid company id", async () => {
  const companiesRepository = new InMemoryCompaniesRepository()
  const updateCompany = new DbUpdateCompany(companiesRepository, companiesRepository);

  expect(updateCompany.update({
    id: "123",
    code: "321"
  })).rejects.toEqual(new Error("invalid id"));
})
