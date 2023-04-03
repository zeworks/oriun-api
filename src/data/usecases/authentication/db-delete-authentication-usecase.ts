import { LoadAccountByIdRepository } from "@/data/protocols/repositories/users/load-account-by-id-repository"
import { UpdateTokenRepository } from "@/data/protocols/repositories/users/update-token-repository"
import {
	DeleteAuthenticationUseCase,
	DeleteAuthenticationUseCaseFn,
} from "@/domain/usecases/authentication/delete-authentication"

export class DbDeleteAuthentication implements DeleteAuthenticationUseCase {
	constructor(
		private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
		private readonly updateTokenRepository: UpdateTokenRepository
	) {}

	deleteToken: DeleteAuthenticationUseCaseFn = async (user) => {
		const account = await this.loadAccountByIdRepository.loadById(user)

		if (!account) return null

		await this.updateTokenRepository.updateToken(user, null)

		return true
	}
}
