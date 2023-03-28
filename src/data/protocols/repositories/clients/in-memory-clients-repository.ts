import { LoadClientByIdUseCaseFn } from "@/domain/usecases/clients/load-client-by-id-usecase"
import { LoadClientByCodeUseCaseFn } from "@/domain/usecases/clients/load-client-by-code-usecase"
import { LoadClientByIdentificationNumberUseCaseFn } from "@/domain/usecases/clients/load-client-by-identificationNumber-usecase"
import {
	CreateClientRepository,
	CreateClientRepositoryFn,
} from "./create-client-repository"
import { LoadClientByCodeRepository } from "./load-client-by-code-repository"
import { LoadClientByIdRepository } from "./load-client-by-id-repository"
import { LoadClientByIdentificationNumberRepository } from "./load-client-by-identificationNumber-repository"
import { ClientsEntity } from "@/domain/entities/clients"
import { UpdateClientRepository } from "./update-client-repository"
import { UpdateClientUseCaseFn } from "@/domain/usecases/clients/update-client-usecase"
import { DeleteClientRepository } from "./delete-client-repository"

export class InMemoryClientsRepository
	implements
		LoadClientByIdRepository,
		CreateClientRepository,
		LoadClientByCodeRepository,
		LoadClientByIdentificationNumberRepository,
		UpdateClientRepository,
		DeleteClientRepository
{
	clients: Array<ClientsEntity> = []

	loadById: LoadClientByIdUseCaseFn = async (id) =>
		this.clients.find((c) => c.id === id) || null
	create: CreateClientRepositoryFn = async (input) => {
		const data = {
			...input,
			createdAt: new Date(),
		}
		this.clients.push(data)
		return data
	}
	loadByCode: LoadClientByCodeUseCaseFn = async (code) =>
		this.clients.find((c) => c.code === code) || null
	loadByIdentificationNumber: LoadClientByIdentificationNumberUseCaseFn =
		async (identificationNumber) =>
			this.clients.find(
				(c) => c.identificationNumber === identificationNumber
			) || null
	update: UpdateClientUseCaseFn = async (input) => {
		const client = this.clients.find((c) => c.id === input.id)
		return Object.assign({}, client, { ...input, updatedAt: new Date() })
	}
	delete = async (id: string): Promise<boolean | null> => {
		const client = this.clients.find((c) => c.id === id)

		if (client) {
			this.clients = this.clients.filter((c) => c.id !== id)
			return true
		}

		return false
	}
}
