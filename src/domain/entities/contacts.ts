import { BaseEntity } from "./base"

export type ContactsEntity = BaseEntity & {
	name: string
	phone?: string | null
	prefix?: string | null
	address?: string | null
	email?: string | null
	country: string
	default: boolean
	postalCode?: string | null
}
