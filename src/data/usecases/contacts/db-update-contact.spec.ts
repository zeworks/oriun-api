import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateContact } from "./db-create-contact"
import { DbUpdateContact } from "./db-update-contact"

test("Should update contact with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const contactsRepository = new InMemoryContactsRepository()
	const createContact = new DbCreateContact(uuidAdapter, contactsRepository)
	const updateContact = new DbUpdateContact(
		contactsRepository,
		contactsRepository
	)

	const contact = await createContact.create({
		country: "Portugal",
		default: true,
		name: "Contact Name",
		phone: "928322345",
		prefix: "+351",
	})

	if (contact) {
		const result = await updateContact.update({
			id: contact?.id,
			name: "Contact Name Updated",
		})
		expect(result?.name).toEqual("Contact Name Updated")
		expect(result?.phone).toEqual(contact.phone)
	}
})
