export interface CheckRoleByKeyUseCase {
	checkByKey: CheckRoleByKeyUseCaseFunction
}

export type CheckRoleByKeyUseCaseFunction = (
	key: string
) => Promise<CheckRoleByKeyUseCase.Result>

export namespace CheckRoleByKeyUseCase {
	export type Result = boolean
}
