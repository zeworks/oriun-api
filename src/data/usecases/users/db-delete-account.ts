import { DeleteAccountRepository } from "@/data/protocols/repositories/users/delete-account-repository"
import {
	DeleteAccountUseCase,
	DeleteAccountUseCaseFn,
} from "@/domain/usecases/users/delete-account"
import { DbLoadAccountById } from "./load-account-by-id"

export class DbDeleteAccount implements DeleteAccountUseCase {
	constructor(
		private readonly loadAccountById: DbLoadAccountById,
		private readonly deleteAccountRepository: DeleteAccountRepository
	) {}

	delete: DeleteAccountUseCaseFn = async (id) => {
		try {
			const user = await this.loadAccountById.loadById(id)

			if (user) {
				const result = await this.deleteAccountRepository.deleteAccount(id)
				return result
			}

			return false
		} catch (error) {
			throw error
		}
	}
}
