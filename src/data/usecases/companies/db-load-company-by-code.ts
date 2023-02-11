import { LoadCompanyByCodeRepository } from "@/data/protocols/repositories/companies/load-company-by-code-repository"
import {
	LoadCompanyByCodeUseCase,
	LoadCompanyByCodeUseCaseFunction,
} from "@/domain/usecases/companies/load-company-by-code"

export class DbLoadCompanyByCode implements LoadCompanyByCodeUseCase {
	constructor(
		private readonly loadCompanyByCodeRepository: LoadCompanyByCodeRepository
	) {}

	loadByCode: LoadCompanyByCodeUseCaseFunction = async (code) => {
		const result = await this.loadCompanyByCodeRepository.loadByCode(code)

		if (!result) throw new Error("invalid code")

		return result
	}
}
