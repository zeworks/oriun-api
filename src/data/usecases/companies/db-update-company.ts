import { LoadCompanyByIdRepository } from "@/data/protocols/repositories/companies/load-company-by-id-repository"
import { UpdateCompanyRepository } from "@/data/protocols/repositories/companies/update-company-repository"
import {
	UpdateCompanyUseCase,
	UpdateCompanyUseCaseFunction,
} from "@/domain/usecases/companies/update-company"

export class DbUpdateCompany implements UpdateCompanyUseCase {
	constructor(
		private readonly loadCompanyByIdRepository: LoadCompanyByIdRepository,
		private readonly updateCompanyRepository: UpdateCompanyRepository
	) {}

	update: UpdateCompanyUseCaseFunction = async (input) => {
		const company = await this.loadCompanyByIdRepository.loadById(input.id)

		if (!company) throw new Error("invalid id")

		return this.updateCompanyRepository.update(input)
	}
}
