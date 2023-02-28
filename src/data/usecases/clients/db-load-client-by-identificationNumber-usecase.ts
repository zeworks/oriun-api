import { LoadClientByIdentificationNumberRepository } from "@/data/protocols/repositories/clients/load-client-by-identificationNumber-repository"
import {
	LoadClientByIdentificationNumberUseCase,
	LoadClientByIdentificationNumberUseCaseFn,
} from "@/domain/usecases/clients/load-client-by-identificationNumber-usecase"

export class DbLoadClientByIdentificationNumber
	implements LoadClientByIdentificationNumberUseCase
{
	constructor(
		private readonly loadClientByIdentificationNumberRepository: LoadClientByIdentificationNumberRepository
	) {}

	loadByIdentificationNumber: LoadClientByIdentificationNumberUseCaseFn = (
		id
	) =>
		this.loadClientByIdentificationNumberRepository.loadByIdentificationNumber(
			id
		)
}
