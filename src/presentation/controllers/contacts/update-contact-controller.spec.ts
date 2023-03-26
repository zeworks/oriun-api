import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { CreateContactController } from "./create-contact-controller"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"
import { DbUpdateContact } from "@/data/usecases/contacts/db-update-contact"
import { UpdateContactController } from "./update-contact-controller"
import { ContactInvalidError } from "@/data/errors/contacts-error"

test("Should update contact with success", async () => {
	// deps
	const contactsRepository = new InMemoryContactsRepository()
	const uuidAdapter = new UuidAdapter()

	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)
	const dbUpdateContact = new DbUpdateContact(
		contactsRepository,
		contactsRepository
	)

	const createContactController = new CreateContactController(
		dbCreateContact,
		makeCreateContactValidation()
	)

	const updateContactController = new UpdateContactController(dbUpdateContact)

	const contact = await createContactController.execute({
		country: "Portugal",
		default: false,
		name: "Teste de Contacto",
		email: "tess@te.com",
	})

	expect(contact.data?.name).toEqual("Teste de Contacto")
	if (contact) {
		const result = await updateContactController.execute({
			id: contact.data?.id!,
			name: "updated contact name",
		})

		expect(result.data?.name).toEqual("updated contact name")
	}
})

test("Should throw an error if invalid contact id", async () => {
	// deps
	const contactsRepository = new InMemoryContactsRepository()

	const dbUpdateContact = new DbUpdateContact(
		contactsRepository,
		contactsRepository
	)

	const updateContactController = new UpdateContactController(dbUpdateContact)

	const result = await updateContactController.execute({
		id: "123",
	})

	expect(result.data).toEqual(new ContactInvalidError())
})
