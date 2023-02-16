import { LoadAccountByIdRepository } from "@/data/protocols/repositories/users/load-account-by-id-repository"
import {
	LoadAccountByIdUseCase,
	LoadAccountByIdUseCaseFunction,
} from "@/domain/usecases/users/load-account-by-id"

export class DbLoadAccountById implements LoadAccountByIdUseCase {
	constructor(
		private readonly loadAccountByIdRepository: LoadAccountByIdRepository
	) {}

	loadById: LoadAccountByIdUseCaseFunction = (id) =>
		this.loadAccountByIdRepository.loadById(id)
}
