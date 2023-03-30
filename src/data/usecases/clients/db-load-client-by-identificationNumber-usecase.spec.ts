import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateClient } from "./db-create-client-usecase"
import { DbLoadClientByCode } from "./db-load-client-by-code-usecase"
import { DbLoadClientByIdentificationNumber } from "./db-load-client-by-identificationNumber-usecase"
import crypto from "crypto"

const accountId = crypto.randomUUID()

test("Should load client by Identification Number with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const uuidAdapter = new UuidAdapter()

	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const dbCreateClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const client = await dbCreateClient.create(
		{
			code: "000",
			identificationNumber: "12345",
			name: "Client name",
			status: true,
		},
		{ accountId }
	)

	if (client) {
		const result =
			await dbLoadClientByIdentificationNumber.loadByIdentificationNumber(
				client.identificationNumber
			)
		expect(result?.identificationNumber).toEqual("12345")
	}
})

test("Should return null if invalid client id", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientById = new DbLoadClientByIdentificationNumber(
		clientsRepository
	)
	const result = await dbLoadClientById.loadByIdentificationNumber("123")
	expect(result).toBeNull()
})
