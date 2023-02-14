export type DeleteDepartmentUseCaseFunction = (
	id: string
) => Promise<DeleteDepartmentUseCase.Result>

export interface DeleteDepartmentUseCase {
	delete: DeleteDepartmentUseCaseFunction
}

export namespace DeleteDepartmentUseCase {
	export type Result = boolean
}
