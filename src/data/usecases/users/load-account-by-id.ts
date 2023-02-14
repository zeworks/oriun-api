import { UserInvalidError } from "@/data/errors/user-invalid-error"
import { LoadAccountByIdRepository } from "@/data/protocols/repositories/users/load-account-by-id-repository"
import {
	LoadAccountByIdUseCase,
	LoadAccountByIdUseCaseFunction,
} from "@/domain/usecases/users/load-account-by-id"

export class DbLoadAccountById implements LoadAccountByIdUseCase {
	constructor(private readonly loadAccountById: LoadAccountByIdRepository) {}

	loadById: LoadAccountByIdUseCaseFunction = async (id) => {
		try {
			const result = await this.loadAccountById.loadById(id)

			if (!result) throw new UserInvalidError()

			return result
		} catch (error) {
			throw error
		}
	}
}
