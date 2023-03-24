import { BaseEntity } from "./base"
import { CompaniesEntity } from "./companies"
import { ContactsEntity } from "./contacts"

export type ClientsEntity = BaseEntity & {
	id: string
	name: string
	code: string
	identificationNumber: string
	status?: boolean | null
	picture?: string | null
	company?: CompaniesEntity | null
	contacts?: Array<ContactsEntity> | null
}
