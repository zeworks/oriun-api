import { BaseEntity } from "./base"
import { ClientsEntity } from "./clients"
import { ContactsEntity } from "./contacts"
import { DepartmentsEntity } from "./departments"
import { RolesEntity } from "./roles"

export type UsersProfileEntity = {
	firstName: string
	lastName?: string | null
	picture?: string | null
}

export type UsersEntity = BaseEntity & {
	username: string
	email: string
	profile: UsersProfileEntity
	status?: boolean | null
	accessToken?: string | null
	identificationNumber?: string | null
	password?: string | null
	readonly role?: RolesEntity | null
	readonly department?: DepartmentsEntity | null
	readonly contact?: ContactsEntity | null
	readonly clients?: Array<ClientsEntity>
}
