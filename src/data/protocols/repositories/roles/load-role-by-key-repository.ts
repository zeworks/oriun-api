import { LoadRoleByKeyUseCaseFunction } from "@/domain/usecases/roles/load-role-by-key"

export interface LoadRoleByKeyRepository {
	loadByKey: LoadRoleByKeyUseCaseFunction
}
