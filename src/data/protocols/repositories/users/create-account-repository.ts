import { CreateAccountUseCase } from "@/domain/usecases/users/create-account"

export interface CreateAccountRepository {
	create: (
		input: CreateAccountRepository.Params
	) => Promise<CreateAccountRepository.Result>
}

export namespace CreateAccountRepository {
	export type Params = CreateAccountUseCase.Params & {
		id: string
	}

	export type Result = CreateAccountUseCase.Result
}
