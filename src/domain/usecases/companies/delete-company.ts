export interface DeleteCompanyUseCase {
	delete: DeleteCompanyUseCaseFunction
}

export type DeleteCompanyUseCaseFunction = (
	id: string
) => Promise<DeleteCompanyUseCase.Result>

export namespace DeleteCompanyUseCase {
	export type Result = boolean | null
}
