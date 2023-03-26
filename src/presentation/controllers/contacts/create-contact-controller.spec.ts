import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { CreateContactController } from "./create-contact-controller"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"

test("Should create contact with success", async () => {
	// deps
	const contactsRepository = new InMemoryContactsRepository()
	const uuidAdapter = new UuidAdapter()
	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)

	const createContactController = new CreateContactController(
		dbCreateContact,
		makeCreateContactValidation()
	)

	const result = await createContactController.execute({
		country: "Portugal",
		default: false,
		name: "Teste de Contacto",
		email: "tess@te.com",
	})

	expect(result.data?.name).toEqual("Teste de Contacto")
})
