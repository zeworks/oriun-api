export interface DeleteAccountUseCase {
	delete: DeleteAccountUseCaseFn
}

export type DeleteAccountUseCaseFn = (
	user_id: string
) => Promise<DeleteAccountUseCase.Result>

export namespace DeleteAccountUseCase {
	export type Result = boolean | null
}
