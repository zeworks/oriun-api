import { RolesEntity } from "@/domain/entities/roles"

export type AccountContext = {
	accountId: string
	accountRole?: RolesEntity
}
