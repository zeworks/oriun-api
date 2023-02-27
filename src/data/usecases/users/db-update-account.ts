import { UserInvalidError } from "@/data/errors/user-invalid-error"
import { UsernameInUseError } from "@/data/errors/username-in-use-error"
import { Hasher } from "@/data/protocols/cryptography/hasher"
import { LoadAccountByIdRepository } from "@/data/protocols/repositories/users/load-account-by-id-repository"
import { LoadAccountByUsernameRepository } from "@/data/protocols/repositories/users/load-account-by-username-repository"
import { UpdateAccountRepository } from "@/data/protocols/repositories/users/update-account-repository"
import {
	UpdateAccountUseCase,
	UpdateAccountUseCaseFn,
} from "@/domain/usecases/users/update-account"

export class DbUpdateAccount implements UpdateAccountUseCase {
	constructor(
		private readonly hashAdapter: Hasher,
		private readonly loadAccountIdUseCase: LoadAccountByIdRepository,
		private readonly loadAccountUsernameUseCase: LoadAccountByUsernameRepository,
		private readonly updateAccountRepository: UpdateAccountRepository
	) {}

	update: UpdateAccountUseCaseFn = async (id, input) => {
		try {
			// validate account, find by account id
			const account = await this.loadAccountIdUseCase.loadById(id)
			if (!account) throw new UserInvalidError()

			// validate by account username
			if (input?.username && input?.username !== account.username) {
				const foundUsername =
					await this.loadAccountUsernameUseCase.loadByUsername(input.username)
				if (foundUsername) throw new UsernameInUseError()
			}

			let password = account.password
			if (input.password && input.password !== password)
				password = await this.hashAdapter.hash(input.password)

			const result = await this.updateAccountRepository.updateAccount(id, {
				...input,
				password,
			})
			return result
		} catch (error) {
			throw error
		}
	}
}
