import { LoadCompanyByIdRepository } from "@/data/protocols/repositories/companies/load-company-by-id-repository"
import {
	LoadCompanyByIdUseCase,
	LoadCompanyByIdUseCaseFunction,
} from "@/domain/usecases/companies/load-company-by-id"

export class DbLoadCompanyById implements LoadCompanyByIdUseCase {
	constructor(
		private readonly loadCompanyByIdRepository: LoadCompanyByIdRepository
	) {}

	loadById: LoadCompanyByIdUseCaseFunction = async (id) => {
		const result = await this.loadCompanyByIdRepository.loadById(id)

		if (!result) throw new Error("invalid id")

		return result
	}
}
