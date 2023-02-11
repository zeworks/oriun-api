export type LoadAccountByUsernameUseCaseFunction = (
	username: string
) => Promise<LoadAccountByUsernameUseCase.Result>

export interface LoadAccountByUsernameUseCase {
	loadByUsername: LoadAccountByUsernameUseCaseFunction
}

export namespace LoadAccountByUsernameUseCase {
	export type Result = {
		id: string
		username: string
	} | null
}
