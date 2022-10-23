import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { expect, test } from "vitest";
import { DbCreateCompany } from "./db-create-company";
import { DbLoadCompanies } from "./db-load-companies";

test("Should return a list of companies with success", async () => {
  const uuidAdapter = new UuidAdapter();
  const companiesRepository = new InMemoryCompaniesRepository();
  const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository);

  const loadCompanies = new DbLoadCompanies(companiesRepository);

  await createCompany.create({
    code: "code-1",
    name: "company name 1",
  })

  await createCompany.create({
    code: "code-2",
    name: "company name 2",
  })

  const result = await loadCompanies.loadCompanies();
  expect(result?.length).toEqual(2);
})

test("Should return a list of companies that are active (status as true) with success", async () => {
  const uuidAdapter = new UuidAdapter();
  const companiesRepository = new InMemoryCompaniesRepository();
  const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository);

  const loadCompanies = new DbLoadCompanies(companiesRepository);

  await createCompany.create({
    code: "code-1",
    name: "company name 1",
  })

  await createCompany.create({
    code: "code-2",
    name: "company name 2",
    status: false
  })

  const result = await loadCompanies.loadCompanies({ filter: { status: true } });
  expect(result?.length).toEqual(1);
})

test("Should return an empty list with success", async () => {
  const companiesRepository = new InMemoryCompaniesRepository();
  const loadCompanies = new DbLoadCompanies(companiesRepository);

  const result = await loadCompanies.loadCompanies();
  expect(result).toEqual([]);
})

test("Should get 2 companies starting from second of the list", async () => {
  const uuidAdapter = new UuidAdapter();
  const companiesRepository = new InMemoryCompaniesRepository();
  const createCompany = new DbCreateCompany(uuidAdapter, companiesRepository);

  const loadCompanies = new DbLoadCompanies(companiesRepository);

  await createCompany.create({
    code: "code-1",
    name: "company name 1",
  })

  await createCompany.create({
    code: "code-2",
    name: "company name 2",
  })

  await createCompany.create({
    code: "code-3",
    name: "company name 3",
  })

  await createCompany.create({
    code: "code-4",
    name: "company name 4",
  })

  await createCompany.create({
    code: "code-5",
    name: "company name 5",
  })

  const result = await loadCompanies.loadCompanies({ pagination: { skip: 1, take: 3 } });
  expect(result?.length).toEqual(3);
})
