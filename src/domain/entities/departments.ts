import { BaseEntity } from "./base"

export type DepartmentsEntity = BaseEntity & {
	name: string
	status: boolean
}
