import { UpdateAccountUseCase } from "@/domain/usecases/users/update-account"

export interface UpdateAccountRepository {
	updateAccount: (
		id: string,
		input: UpdateAccountUseCase.Input
	) => Promise<UpdateAccountUseCase.Result>
}
