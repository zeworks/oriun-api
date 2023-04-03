export interface DeleteAuthenticationUseCase {
	deleteToken: DeleteAuthenticationUseCaseFn
}

export namespace DeleteAuthenticationUseCase {
	export type Result = boolean | null
}

export type DeleteAuthenticationUseCaseFn = (
	userId: string
) => Promise<DeleteAuthenticationUseCase.Result>
