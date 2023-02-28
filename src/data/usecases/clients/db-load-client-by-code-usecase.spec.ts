import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateClientUseCase } from "./db-create-client-usecase"
import { DbLoadClientByCode } from "./db-load-client-by-code-usecase"
import { DbLoadClientByIdentificationNumber } from "./db-load-client-by-identificationNumber-usecase"

test("Should create and load client by code with sucess", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const uuidAdapter = new UuidAdapter()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const dbCreateClient = new DbCreateClientUseCase(
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
		const result = await dbLoadClientByCode.loadByCode(client?.code)
		expect(result?.id).toEqual(client.id)
	}
})

test("Should return null if invalid client code", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const result = await dbLoadClientByCode.loadByCode("222")
	expect(result).toEqual(null)
})
