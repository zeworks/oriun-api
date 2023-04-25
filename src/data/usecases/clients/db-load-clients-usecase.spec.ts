import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateClient } from "./db-create-client-usecase"
import { DbLoadClients } from "./db-load-clients-usecase"
import { DbLoadClientByCode } from "./db-load-client-by-code-usecase"
import { DbLoadClientByIdentificationNumber } from "./db-load-client-by-identificationNumber-usecase"
import crypto from "crypto"

const accountId = crypto.randomUUID()

test("Should return a list of clients with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "code-1",
			name: "client name 1",
			identificationNumber: "12",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-2",
			name: "client name 2",
			identificationNumber: "123",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients()
	expect(result?.total).toEqual(2)
})

test("Should return a list of clients that are active (status as true) with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "code-1",
			name: "client name 1",
			status: true,
			identificationNumber: "12",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-2",
			name: "client name 2",
			status: false,
			identificationNumber: "123",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients({ filter: { status: true } })
	expect(result?.total).toEqual(1)
})

test("Should return an empty list with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const loadClients = new DbLoadClients(clientsRepository)

	const result = await loadClients.loadClients()
	expect(result?.data).toEqual([])
})

test("Should get 3 clients starting from second of the list", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "code-1",
			name: "company name 1",
			identificationNumber: "1",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-2",
			name: "company name 2",
			identificationNumber: "2",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-3",
			name: "company name 3",
			identificationNumber: "3",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-4",
			name: "company name 4",
			identificationNumber: "4",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-5",
			name: "company name 5",
			identificationNumber: "5",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients({
		pagination: { skip: 1, take: 3 },
	})
	expect(result?.total).toEqual(3)
})

test("Should return a list of clients that contains the code 'test'", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "code-teste-1",
			name: "company name 1",
			identificationNumber: "2",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-2",
			name: "company name 2",
			status: false,
			identificationNumber: "32",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-3-test",
			name: "company name 2",
			status: false,
			identificationNumber: "24",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients({ search: "test" })
	expect(result?.total).toEqual(2)
})

test("Should return a list of clients that contains the name 'test'", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "code-teste-1",
			name: "company name 1",
			identificationNumber: "24",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-2",
			name: "company test",
			status: false,
			identificationNumber: "224",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-3-test",
			name: "company name 2",
			status: false,
			identificationNumber: "214",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients({ search: "test" })
	expect(result?.total).toEqual(3)
})

test("Should search by id with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "code-teste-1",
			name: "company name 1",
			identificationNumber: "214",
		},
		{ accountId }
	)

	const company = await createClient.create(
		{
			code: "code-2",
			name: "company test",
			status: false,
			identificationNumber: "1114",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-3-test",
			name: "company name 2",
			status: false,
			identificationNumber: "2124",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients({ search: company?.id })
	expect(result?.total).toEqual(1)
})

test("Should return an empty list with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const loadClients = new DbLoadClients(clientsRepository)

	const result = await loadClients.loadClients()
	expect(result?.data).toEqual([])
})

test("Should order by id with success ASC", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "code-teste-1",
			name: "company name 1",
			identificationNumber: "2124",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-2",
			name: "company test",
			status: false,
			identificationNumber: "21224",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "code-3-test",
			name: "company name 2",
			status: false,
			identificationNumber: "21214",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients({
		orderBy: { key: "ID", sort: "ASC" },
	})
	expect(result?.total).toEqual(3)
})

test("Should order by CODE with success ASC", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "a",
			name: "company name 1",
			identificationNumber: "21214",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "c",
			name: "company test",
			status: false,
			identificationNumber: "212214",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "b",
			name: "company name 2",
			status: false,
			identificationNumber: "2121114",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients({
		orderBy: { key: "CODE", sort: "ASC" },
	})
	expect(result?.total).toEqual(3)
})

test("Should order by NAME with success ASC", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "a",
			name: "company name 1",
			identificationNumber: "2121114",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "c",
			name: "company name 3",
			status: false,
			identificationNumber: "212114",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "b",
			name: "company name 2",
			status: false,
			identificationNumber: "211114",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients({
		orderBy: { key: "NAME", sort: "ASC" },
	})
	expect(result?.total).toEqual(3)
	expect(result?.data?.[0].code).toEqual("a")
	expect(result?.data?.[1].code).toEqual("b")
	expect(result?.data?.[2].code).toEqual("c")
})

test("Should order by NAME with success DESC", async () => {
	const uuidAdapter = new UuidAdapter()
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const createClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const loadClients = new DbLoadClients(clientsRepository)

	await createClient.create(
		{
			code: "a",
			name: "company name 1",
			identificationNumber: "211114",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "c",
			name: "company name 3",
			status: false,
			identificationNumber: "12",
		},
		{ accountId }
	)

	await createClient.create(
		{
			code: "b",
			name: "company name 2",
			status: false,
			identificationNumber: "111",
		},
		{ accountId }
	)

	const result = await loadClients.loadClients({
		orderBy: { key: "NAME", sort: "DESC" },
	})
	expect(result?.total).toEqual(3)
	expect(result?.data?.[0].code).toEqual("c")
	expect(result?.data?.[1].code).toEqual("b")
	expect(result?.data?.[2].code).toEqual("a")
})
