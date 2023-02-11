import { Uuid } from "@/data/protocols/cryptography/uuid"
import { CreateCompanyRepository } from "@/data/protocols/repositories/companies/create-company-repository"
import {
	CreateCompanyUseCase,
	CreateCompanyUseCaseFunction,
} from "@/domain/usecases/companies/create-company"

export class DbCreateCompany implements CreateCompanyUseCase {
	constructor(
		private readonly uuid: Uuid,
		private readonly createCompanyRepository: CreateCompanyRepository
	) {}

	create: CreateCompanyUseCaseFunction = async (input) => {
		const id = await this.uuid.generate()
		return this.createCompanyRepository.create({
			...input,
			status: input.status ?? true,
			id,
		})
	}
}
