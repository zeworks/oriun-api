import { LoadAccountByEmailRepository } from "@/data/protocols/repositories/users/load-account-by-email-repository"
import {
	LoadAccountByEmailUseCase,
	LoadAccountByEmailUseCaseFunction,
} from "@/domain/usecases/users/load-account-by-email"

export class DbLoadAccountByEmail implements LoadAccountByEmailUseCase {
	constructor(
		private readonly loadAccountByEmail: LoadAccountByEmailRepository
	) {}

	loadByEmail: LoadAccountByEmailUseCaseFunction = (email) => {
		return this.loadAccountByEmail.loadByEmail(email)
	}
}
