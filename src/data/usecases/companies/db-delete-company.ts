import { DeleteCompanyRepository } from "@/data/protocols/repositories/companies/delete-company-repository"
import { LoadCompanyByIdRepository } from "@/data/protocols/repositories/companies/load-company-by-id-repository"
import {
	DeleteCompanyUseCase,
	DeleteCompanyUseCaseFunction,
} from "@/domain/usecases/companies/delete-company"

export class DbDeleteCompany implements DeleteCompanyUseCase {
	constructor(
		private readonly loadCompanyByIdRepository: LoadCompanyByIdRepository,
		private readonly deleteCompanyRepository: DeleteCompanyRepository
	) {}

	delete: DeleteCompanyUseCaseFunction = async (id) => {
		try {
			const company = await this.loadCompanyByIdRepository.loadById(id)

			if (!company) throw new Error("invalid company id")

			const result = await this.deleteCompanyRepository.delete(id)
			return result
		} catch (error) {
			throw error
		}
	}
}
