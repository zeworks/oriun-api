import { Uuid } from "@/data/protocols/cryptography/uuid"
import { CreateContactRepository } from "@/data/protocols/repositories/contacts/create-contact-repository"
import {
	CreateContactUseCase,
	CreateContactUseCaseFunction,
} from "@/domain/usecases/contacts/create-contact"

export class DbCreateContact implements CreateContactUseCase {
	constructor(
		private readonly uuid: Uuid,
		private readonly createContactRepository: CreateContactRepository
	) {}

	create: CreateContactUseCaseFunction = async (input) => {
		const id = await this.uuid.generate()
		return this.createContactRepository.create({ ...input, id })
	}
}
