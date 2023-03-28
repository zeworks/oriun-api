import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { expect, test } from "vitest"
import { DeleteClientController } from "./delete-client-controller"
import { DbDeleteClient } from "@/data/usecases/clients/db-delete-client-usecase"
import { DbLoadClientById } from "@/data/usecases/clients/db-load-client-by-id-usecase"
import { ClientInvalidError } from "@/data/errors/clients-error"
import { MissingParamError } from "@/presentation/errors/missing-param-error"

test("Should delete client with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()

	clientsRepository.clients = [
		{
			id: "123",
			code: "code",
			identificationNumber: "ODOD",
			name: "NAME",
		},
	]

	const loadClientByIdRepository = new DbLoadClientById(clientsRepository)
	const deleteClientUseCase = new DbDeleteClient(
		loadClientByIdRepository,
		clientsRepository
	)

	const deleteClientController = new DeleteClientController(deleteClientUseCase)
	const result = await deleteClientController.execute({ id: "123" })

	expect(result.data).toEqual(true)
	expect(clientsRepository.clients.length).toEqual(0)
})

test("Should not delete client with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()

	clientsRepository.clients = [
		{
			id: "123",
			code: "code",
			identificationNumber: "ODOD",
			name: "NAME",
		},
	]

	const loadClientByIdRepository = new DbLoadClientById(clientsRepository)
	const deleteClientUseCase = new DbDeleteClient(
		loadClientByIdRepository,
		clientsRepository
	)

	const deleteClientController = new DeleteClientController(deleteClientUseCase)
	const result = await deleteClientController.execute({ id: "1231" })

	expect(result.data).toEqual(new ClientInvalidError())
	expect(clientsRepository.clients.length).toEqual(1)
})

test("Should throw an error if not sending client id", async () => {
	const clientsRepository = new InMemoryClientsRepository()

	const loadClientByIdRepository = new DbLoadClientById(clientsRepository)
	const deleteClientUseCase = new DbDeleteClient(
		loadClientByIdRepository,
		clientsRepository
	)

	const deleteClientController = new DeleteClientController(deleteClientUseCase)
	const result = await deleteClientController.execute({ id: "" })

	expect(result.data).toEqual(new MissingParamError("id"))
	expect(clientsRepository.clients.length).toEqual(0)
})
