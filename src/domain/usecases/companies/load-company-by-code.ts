import { CompaniesEntity } from "@/domain/entities/companies"

export interface LoadCompanyByCodeUseCase {
	loadByCode: LoadCompanyByCodeUseCaseFunction
}

export type LoadCompanyByCodeUseCaseFunction = (
	code: string
) => Promise<LoadCompanyByCodeUseCase.Result>

export namespace LoadCompanyByCodeUseCase {
	export type Result = CompaniesEntity | null
}
