import { CompanyCodeAlreadyExistsError } from "@/data/errors/companies-error"
import { Uuid } from "@/data/protocols/cryptography/uuid"
import { CreateCompanyRepository } from "@/data/protocols/repositories/companies/create-company-repository"
import { LoadCompanyByCodeRepository } from "@/data/protocols/repositories/companies/load-company-by-code-repository"
import {
	CreateCompanyUseCase,
	CreateCompanyUseCaseFunction,
} from "@/domain/usecases/companies/create-company"

export class DbCreateCompany implements CreateCompanyUseCase {
	constructor(
		private readonly uuid: Uuid,
		private readonly loadCompanyByCodeRepository: LoadCompanyByCodeRepository,
		private readonly createCompanyRepository: CreateCompanyRepository
	) {}

	create: CreateCompanyUseCaseFunction = async (input) => {
		const companyCodeExists = await this.loadCompanyByCodeRepository.loadByCode(
			input.code
		)

		if (companyCodeExists) throw new CompanyCodeAlreadyExistsError()

		const id = await this.uuid.generate()

		return this.createCompanyRepository.create({
			...input,
			status: input.status ?? true,
			id,
		})
	}
}
