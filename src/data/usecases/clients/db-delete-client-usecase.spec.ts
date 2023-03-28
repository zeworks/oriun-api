import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { expect, test } from "vitest"
import { DbDeleteClient } from "./db-delete-client-usecase"
import { DbLoadClientById } from "./db-load-client-by-id-usecase"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { ClientInvalidError } from "@/data/errors/clients-error"

test("Should delete client with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const clientId = await new UuidAdapter().generate()

	clientsRepository.clients = [
		{
			id: clientId,
			code: "CODE",
			identificationNumber: "IDENTIFICATION",
			name: "NAME",
		},
	]
	expect(clientsRepository.clients.length).toEqual(1)

	const dbLoadClientById = new DbLoadClientById(clientsRepository)
	const dbDeleteClient = new DbDeleteClient(dbLoadClientById, clientsRepository)

	const result = await dbDeleteClient.delete(clientId)

	expect(result).toEqual(true)
	expect(clientsRepository.clients.length).toEqual(0)
})

test("Should throw an error if invalid client id", async () => {
	const clientsRepository = new InMemoryClientsRepository()

	const dbLoadClientById = new DbLoadClientById(clientsRepository)
	const dbDeleteClient = new DbDeleteClient(dbLoadClientById, clientsRepository)
	expect(dbDeleteClient.delete("123")).rejects.toEqual(new ClientInvalidError())
})
