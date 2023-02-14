import { AccessTokenInvalidError } from "@/data/errors/accessToken-invalid-error"
import { Decrypter } from "@/data/protocols/cryptography/decrypter"
import { LoadAccountByTokenRepository } from "@/data/protocols/repositories/users/load-account-by-token-repository"
import {
	LoadAccountByTokenUseCase,
	LoadAccountByTokenUseCaseFunction,
} from "@/domain/usecases/users/load-account-by-token"

export class DbLoadAccountByToken implements LoadAccountByTokenUseCase {
	constructor(
		private readonly decrypter: Decrypter,
		private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
	) {}

	loadToken: LoadAccountByTokenUseCaseFunction = async (accessToken) => {
		try {
			const token = await this.decrypter.decrypt(accessToken)

			if (!token) throw new AccessTokenInvalidError()

			const account = await this.loadAccountByTokenRepository.loadToken(
				accessToken
			)

			return account
		} catch (error) {
			throw error
		}
	}
}
