import { LoadContactByIdRepository } from "@/data/protocols/repositories/contacts/load-contact-by-id-repository"
import {
	LoadContactByIdUseCase,
	LoadContactByIdUseCaseFunction,
} from "@/domain/usecases/contacts/load-contact-by-id"

export class DbLoadContactById implements LoadContactByIdUseCase {
	constructor(
		private readonly loadContactByIdRepository: LoadContactByIdRepository
	) {}
	loadById: LoadContactByIdUseCaseFunction = (id) => {
		return this.loadContactByIdRepository.loadById(id)
	}
}
