export type UpdateAuthenticationTokenUseCaseFunction = (
	user_id: string
) => Promise<UpdateAuthenticationTokenUseCase.Result>

export interface UpdateAuthenticationTokenUseCase {
	updateToken: UpdateAuthenticationTokenUseCaseFunction
}

export namespace UpdateAuthenticationTokenUseCase {
	/**
	 * @returns token
	 */
	export type Result = {
		accessToken: string
	} | null
}
