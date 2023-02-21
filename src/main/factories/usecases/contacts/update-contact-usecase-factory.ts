import { DbUpdateContact } from "@/data/usecases/contacts/db-update-contact"
import { ContactsRepository } from "@/infra/db/prisma/repos/contacts-repository"

export const makeUpdateContactUseCase = () => {
	const contactsRepository = new ContactsRepository()
	return new DbUpdateContact(contactsRepository, contactsRepository)
}
