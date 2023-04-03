export type LoadAccountByEmailUseCaseFunction = (
	email: string
) => Promise<LoadAccountByEmailUseCase.Result>

export interface LoadAccountByEmailUseCase {
	loadByEmail: LoadAccountByEmailUseCaseFunction
}

export namespace LoadAccountByEmailUseCase {
	export type Result = {
		id: string
		email: string
		password?: string | null
		status?: boolean | null
	} | null
}
