import { LoadRoleByKeyRepository } from "@/data/protocols/repositories/roles/load-role-by-key-repository"
import {
	LoadRoleByKeyUseCase,
	LoadRoleByKeyUseCaseFunction,
} from "@/domain/usecases/roles/load-role-by-key"

export class DbLoadRoleByKey implements LoadRoleByKeyUseCase {
	constructor(private readonly loadRoleByKey: LoadRoleByKeyRepository) {}

	loadByKey: LoadRoleByKeyUseCaseFunction = (key) => {
		return this.loadRoleByKey.loadByKey(key)
	}
}
