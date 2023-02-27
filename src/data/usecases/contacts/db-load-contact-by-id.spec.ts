import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateContact } from "./db-create-contact"
import { DbLoadContactById } from "./db-load-contact-by-id"

test("Should create contact and load contact by id with success", async () => {
	const uuidAdapter = new UuidAdapter()
	const contactsRepository = new InMemoryContactsRepository()
	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)
	const dbLoadContactById = new DbLoadContactById(contactsRepository)

	// create contact
	const contact = await dbCreateContact.create({
		country: "Portugal",
		default: true,
		name: "contact name",
		phone: "912345671",
		prefix: "+351",
	})

	if (contact?.id) {
		const result = await dbLoadContactById.loadById(contact?.id)

		expect(result?.name).toEqual(contact.name)
		expect(result?.id).toEqual(contact.id)
	}
})
