import { CompaniesEntity } from "@/domain/entities/companies"

export interface UpdateCompanyUseCase {
	update: UpdateCompanyUseCaseFunction
}

export type UpdateCompanyUseCaseFunction = (
	input: UpdateCompanyUseCase.Params
) => Promise<UpdateCompanyUseCase.Result>

export namespace UpdateCompanyUseCase {
	export type Params = Partial<CompaniesEntity> & {
		id: string
	}

	export type Result = CompaniesEntity | null
}
