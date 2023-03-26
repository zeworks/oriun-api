import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateClient } from "./db-create-client-usecase"
import { DbLoadClientByCode } from "./db-load-client-by-code-usecase"
import { DbLoadClientById } from "./db-load-client-by-id-usecase"
import { DbLoadClientByIdentificationNumber } from "./db-load-client-by-identificationNumber-usecase"

test("Should load client by ID with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const uuidAdapter = new UuidAdapter()

	const dbLoadClientById = new DbLoadClientById(clientsRepository)
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const dbCreateClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const client = await dbCreateClient.create({
		code: "000",
		identificationNumber: "12345",
		name: "Client name",
		status: true,
	})

	if (client) {
		const result = await dbLoadClientById.loadById(client.id)
		expect(result?.code).toEqual("000")
	}
})

test("Should return null if invalid client id", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientById = new DbLoadClientById(clientsRepository)
	const result = await dbLoadClientById.loadById("123")
	expect(result).toBeNull()
})
