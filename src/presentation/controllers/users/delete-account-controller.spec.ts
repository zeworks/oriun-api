import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { expect, test } from "vitest"
import { CreateAccountController } from "./create-account-controller"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { DbCreateAccount } from "@/data/usecases/users/db-create-account"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { DbDeleteAccount } from "@/data/usecases/users/db-delete-account"
import { DbLoadAccountById } from "@/data/usecases/users/load-account-by-id"
import { DeleteAccountController } from "./delete-account-controller"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"

test("Should delete account with success", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const contactsRepository = new InMemoryContactsRepository()
	const uuidAdapter = new UuidAdapter()
	const bcrypt = new BcryptAdapter(8)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		bcrypt,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepository
	)
	const dbDeleteAccount = new DbDeleteAccount(
		dbLoadAccountById,
		usersRepository
	)
	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)
	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateContact,
		makeCreateContactValidation(),
		dbCreateAccount
	)

	const deleteAccountController = new DeleteAccountController(dbDeleteAccount)

	const user = await createAccountController.execute({
		input: {
			email: "jose@teste.com",
			profile: {
				firstName: "Jose",
			},
			username: "JoseN",
		},
	})

	await createAccountController.execute({
		input: {
			email: "jose2@teste.com",
			profile: {
				firstName: "Jose",
			},
			username: "JoseN2",
		},
	})

	const result = await deleteAccountController.execute({ id: user.data?.id! })
	expect(result.data).toEqual(true)
	expect(usersRepository.users.length).toEqual(1)
})
