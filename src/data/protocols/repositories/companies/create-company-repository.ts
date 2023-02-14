import { CreateCompanyUseCase } from "@/domain/usecases/companies/create-company"

export interface CreateCompanyRepository {
	create: (
		input: CreateCompanyRepository.Params
	) => Promise<CreateCompanyRepository.Result>
}

export namespace CreateCompanyRepository {
	export type Params = CreateCompanyUseCase.Params & {
		id: string
	}
	export type Result = CreateCompanyUseCase.Result
}
