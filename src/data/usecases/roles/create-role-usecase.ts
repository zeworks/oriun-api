import { KeyInUseError } from "@/data/errors/key-in-use-error"
import { CheckRoleByKeyRepository } from "@/data/protocols/repositories/roles/check-role-by-key-respository"
import { CreateRoleRepository } from "@/data/protocols/repositories/roles/create-role-repository"
import {
	CreateRoleUseCase,
	CreateRoleUseCaseFunction,
} from "@/domain/usecases/roles/create-role"

export class DbCreateRole implements CreateRoleUseCase {
	constructor(
		private readonly checkRoleByKeyRepository: CheckRoleByKeyRepository,
		private readonly createRoleRepository: CreateRoleRepository
	) {}

	create: CreateRoleUseCaseFunction = async (input) => {
		try {
			const keyExists = await this.checkRoleByKeyRepository.checkByKey(
				input.key
			)

			if (keyExists) throw new KeyInUseError(input.key)

			const role = await this.createRoleRepository.create({
				...input,
				status: input.status ?? true,
			})
			return role
		} catch (error: any) {
			throw error
		}
	}
}
