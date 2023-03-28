export interface DeleteClientUseCase {
	delete: DeleteClientUseCaseFn
}

export type DeleteClientUseCaseFn = (
	id: string
) => Promise<DeleteClientUseCase.Result>

export namespace DeleteClientUseCase {
	export type Result = boolean | null
}
