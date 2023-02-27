import { ContactsEntity } from "@/domain/entities/contacts"
import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact"
import { LoadContactByIdUseCaseFunction } from "@/domain/usecases/contacts/load-contact-by-id"
import { UpdateContactUseCaseFunction } from "@/domain/usecases/contacts/update-contact"
import { CreateContactRepository } from "./create-contact-repository"
import { LoadContactByIdRepository } from "./load-contact-by-id-repository"
import { UpdateContactRepository } from "./update-contact-repository"

export class InMemoryContactsRepository
	implements
		CreateContactRepository,
		UpdateContactRepository,
		LoadContactByIdRepository
{
	private contacts: ContactsEntity[] = []

	async create(
		input: CreateContactRepository.Params
	): Promise<CreateContactUseCase.Result> {
		const data = {
			...input,
			createdAt: new Date(),
		}
		this.contacts.push(data)
		return data
	}

	update: UpdateContactUseCaseFunction = async (input) => {
		const contact = this.contacts.find((c) => c.id === input.id)

		if (!contact) return null

		return Object.assign({}, contact, {
			...input,
			updatedAt: new Date(),
		})
	}

	loadById: LoadContactByIdUseCaseFunction = async (id) => {
		return this.contacts.find((c) => c.id === id) || null
	}
}
