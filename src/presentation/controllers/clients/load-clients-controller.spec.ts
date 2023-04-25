import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { DbCreateClient } from "@/data/usecases/clients/db-create-client-usecase"
import { DbLoadClientByCode } from "@/data/usecases/clients/db-load-client-by-code-usecase"
import { DbLoadClientByIdentificationNumber } from "@/data/usecases/clients/db-load-client-by-identificationNumber-usecase"
import { DbLoadClients } from "@/data/usecases/clients/db-load-clients-usecase"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateClientControllerValidation } from "@/main/factories/controllers/clients/create-client-controller-validation"
import { expect, test } from "vitest"
import { CreateClientController } from "./create-client-controller"
import { LoadClientsController } from "./load-clients-controller"
import crypto from "crypto"

const accountId = crypto.randomUUID()

test("It should return a list of clients", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const uuidAdapter = new UuidAdapter()

	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdNumber = new DbLoadClientByIdentificationNumber(
		clientsRepository
	)
	const dbCreateClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdNumber,
		clientsRepository
	)
	const createClientController = new CreateClientController(
		dbCreateClient,
		makeCreateClientControllerValidation()
	)

	await createClientController.execute(
		{
			code: "CLIENT-CODE",
			name: "CLIENT-NAME",
			identificationNumber: "CLIENT-IDNUMBER",
		},
		{ accountId }
	)

	const dbLoadClients = new DbLoadClients(clientsRepository)
	const loadClientsController = new LoadClientsController(dbLoadClients)

	const clients = await loadClientsController.execute()
	expect(clients.data?.total).toEqual(1)
})

test("It should return a list of clients", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClients = new DbLoadClients(clientsRepository)
	const loadClientsController = new LoadClientsController(dbLoadClients)

	const clients = await loadClientsController.execute()
	expect(clients.data?.total).toEqual(0)
	expect(clients.data?.data).toEqual([])
})

test("It should return a list clients paginated", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const uuidAdapter = new UuidAdapter()

	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdNumber = new DbLoadClientByIdentificationNumber(
		clientsRepository
	)
	const dbCreateClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdNumber,
		clientsRepository
	)
	const createClientController = new CreateClientController(
		dbCreateClient,
		makeCreateClientControllerValidation()
	)

	await createClientController.execute(
		{
			code: "CLIENT-CODE",
			name: "CLIENT-NAME",
			identificationNumber: "CLIENT-IDNUMBER",
		},
		{ accountId }
	)

	await createClientController.execute(
		{
			code: "CLIENT-CODE-2",
			name: "CLIENT-NAME-2",
			identificationNumber: "CLIENT-IDNUMBER-2",
		},
		{ accountId }
	)

	await createClientController.execute(
		{
			code: "CLIENT-CODE-3",
			name: "CLIENT-NAME-3",
			identificationNumber: "CLIENT-IDNUMBER-3",
		},
		{ accountId }
	)

	await createClientController.execute(
		{
			code: "CLIENT-CODE-4",
			name: "CLIENT-NAME-4",
			identificationNumber: "CLIENT-IDNUMBER-4",
		},
		{ accountId }
	)

	const dbLoadClients = new DbLoadClients(clientsRepository)
	const loadClientsController = new LoadClientsController(dbLoadClients)

	const result = await loadClientsController.execute({
		pagination: {
			skip: 1,
			take: 2,
		},
	})

	expect(result.data?.total).toEqual(2)
})
