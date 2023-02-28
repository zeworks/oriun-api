import { LoadClientByCodeRepository } from "@/data/protocols/repositories/clients/load-client-by-code-repository"
import {
	LoadClientByCodeUseCase,
	LoadClientByCodeUseCaseFn,
} from "@/domain/usecases/clients/load-client-by-code-usecase"

export class DbLoadClientByCode implements LoadClientByCodeUseCase {
	constructor(
		private readonly loadClientByCodeRepository: LoadClientByCodeRepository
	) {}

	loadByCode: LoadClientByCodeUseCaseFn = (id) =>
		this.loadClientByCodeRepository.loadByCode(id)
}
