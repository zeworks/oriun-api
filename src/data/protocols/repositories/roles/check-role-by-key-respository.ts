export interface CheckRoleByKeyRepository {
	checkByKey: (key: string) => Promise<CheckRoleByKeyRepository.Result>
}

export namespace CheckRoleByKeyRepository {
	export type Result = boolean
}
