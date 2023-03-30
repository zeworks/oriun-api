import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { expect, test } from "vitest"
import { DbUpdateClient } from "./db-update-client-usecase"
import { DbLoadClientById } from "./db-load-client-by-id-usecase"
import { DbCreateClient } from "./db-create-client-usecase"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { DbLoadClientByCode } from "./db-load-client-by-code-usecase"
import { DbLoadClientByIdentificationNumber } from "./db-load-client-by-identificationNumber-usecase"
import { ClientInvalidError } from "@/data/errors/clients-error"
import crypto from "crypto"

const CLIENT_DATA = {
	code: "CLIENT_CODE",
	name: "CLIENT NAME",
	identificationNumber: "CLIENT IDENTIFICATION",
}
const userId = crypto.randomUUID()

test("Should update client with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const uuidAdapter = new UuidAdapter()

	const dbLoadClientById = new DbLoadClientById(clientsRepository)
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const dbUpdateClient = new DbUpdateClient(dbLoadClientById, clientsRepository)

	const dbCreateClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const client = await dbCreateClient.create(CLIENT_DATA, { accountId: userId })

	if (client) {
		const result = await dbUpdateClient.update({
			id: client.id,
			name: "teste",
			status: true,
		})

		expect(result?.code).toEqual(client.code)
		expect(result?.name).toEqual("teste")
		expect(result?.status).toEqual(true)
	}
})

test("Should throw an error if invalid client id", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientById = new DbLoadClientById(clientsRepository)

	new DbLoadClientByIdentificationNumber(clientsRepository)
	const dbUpdateClient = new DbUpdateClient(dbLoadClientById, clientsRepository)

	expect(
		dbUpdateClient.update({
			id: "teste",
			name: "teste",
			status: true,
		})
	).rejects.toEqual(new ClientInvalidError())
})
