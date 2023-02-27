import { UserInvalidError } from "@/data/errors/user-invalid-error"
import { UsernameInUseError } from "@/data/errors/username-in-use-error"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { DbLoadContactById } from "@/data/usecases/contacts/db-load-contact-by-id"
import { DbUpdateContact } from "@/data/usecases/contacts/db-update-contact"
import { DbCreateAccount } from "@/data/usecases/users/db-create-account"
import { DbUpdateAccount } from "@/data/usecases/users/db-update-account"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { DbLoadAccountById } from "@/data/usecases/users/load-account-by-id"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"
import { makeUpdateContactValidation } from "@/main/factories/controllers/contacts/update-contact-controller-validation"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { faker } from "@faker-js/faker"
import { expect, test } from "vitest"
import { CreateAccountController } from "./create-account-controller"
import { UpdateAccountController } from "./update-account-controller"

test("Should update first name and password", async () => {
	const hashAdapter = new BcryptAdapter(8)
	const uuidAdapter = new UuidAdapter()
	const usersRepository = new InMemoryUsersRepository()
	const contactsRepository = new InMemoryContactsRepository()

	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const dbLoadContactByIdRepository = new DbLoadContactById(contactsRepository)

	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		hashAdapter,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepository
	)

	const dbUpdateAccount = new DbUpdateAccount(
		hashAdapter,
		dbLoadAccountById,
		dbLoadAccountByUsername,
		usersRepository
	)

	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)

	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateContact,
		makeCreateContactValidation(),
		dbCreateAccount
	)

	const dbUpdateContact = new DbUpdateContact(
		dbLoadContactByIdRepository,
		contactsRepository
	)

	const updateAccountController = new UpdateAccountController(
		dbUpdateAccount,
		dbCreateContact,
		makeCreateContactValidation(),
		dbUpdateContact,
		makeUpdateContactValidation()
	)

	const account = await createAccountController.execute({
		input: {
			email: "newuser@test.com",
			password: "ola",
			profile: {
				firstName: faker.name.firstName(),
			},
			username: faker.name.middleName(),
		},
	})

	if (account?.data?.id) {
		expect(account.data.profile.firstName).not.toBeNull()

		const result = await updateAccountController.execute({
			id: account.data.id,
			input: {
				...account.data,
				role: account.data.role?.id,
				department: account.data.department?.id,
				profile: {
					firstName: "José",
				},
				password: "teste",
			},
		})

		expect(result?.data?.profile.firstName).toEqual("José")
		expect(result?.data?.password).not.toEqual(account.data.password)
	}
})

test("Should update the username", async () => {
	const hashAdapter = new BcryptAdapter(8)
	const uuidAdapter = new UuidAdapter()
	const usersRepository = new InMemoryUsersRepository()
	const contactsRepository = new InMemoryContactsRepository()

	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const dbLoadContactByIdRepository = new DbLoadContactById(contactsRepository)

	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		hashAdapter,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepository
	)

	const dbUpdateAccount = new DbUpdateAccount(
		hashAdapter,
		dbLoadAccountById,
		dbLoadAccountByUsername,
		usersRepository
	)

	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)
	const dbUpdateContact = new DbUpdateContact(
		dbLoadContactByIdRepository,
		contactsRepository
	)

	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateContact,
		makeCreateContactValidation(),
		dbCreateAccount
	)

	const updateAccountController = new UpdateAccountController(
		dbUpdateAccount,
		dbCreateContact,
		makeCreateContactValidation(),
		dbUpdateContact,
		makeUpdateContactValidation()
	)

	const account = await createAccountController.execute({
		input: {
			email: "newuser@test.com",
			password: "ola",
			profile: {
				firstName: faker.name.firstName(),
			},
			username: faker.name.middleName(),
		},
	})

	if (account?.data?.id) {
		expect(account.data.profile.firstName).not.toBeNull()

		const result = await updateAccountController.execute({
			id: account.data.id,
			input: {
				...account.data,
				role: account.data.role?.id,
				department: account.data.department?.id,
				username: "teste",
			},
		})

		expect(result?.data?.username).toEqual("teste")
	}
})

test("Should throw an error if username is already in use", async () => {
	const hashAdapter = new BcryptAdapter(8)
	const uuidAdapter = new UuidAdapter()
	const usersRepository = new InMemoryUsersRepository()
	const contactsRepository = new InMemoryContactsRepository()

	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const dbLoadContactByIdRepository = new DbLoadContactById(contactsRepository)

	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		hashAdapter,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepository
	)

	const dbUpdateAccount = new DbUpdateAccount(
		hashAdapter,
		dbLoadAccountById,
		dbLoadAccountByUsername,
		usersRepository
	)
	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)
	const dbUpdateContact = new DbUpdateContact(
		dbLoadContactByIdRepository,
		contactsRepository
	)

	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateContact,
		makeCreateContactValidation(),
		dbCreateAccount
	)

	const updateAccountController = new UpdateAccountController(
		dbUpdateAccount,
		dbCreateContact,
		makeCreateContactValidation(),
		dbUpdateContact,
		makeUpdateContactValidation()
	)

	const oldAccount = await createAccountController.execute({
		input: {
			email: "newuser1@test.com",
			password: "ola",
			profile: {
				firstName: faker.name.firstName(),
			},
			username: faker.name.middleName(),
		},
	})

	const account = await createAccountController.execute({
		input: {
			email: "newuser@test.com",
			password: "ola",
			profile: {
				firstName: faker.name.firstName(),
			},
			username: faker.name.middleName(),
		},
	})

	if (account?.data?.id) {
		expect(account.data.profile.firstName).not.toBeNull()

		const result = await updateAccountController.execute({
			id: account.data.id,
			input: {
				...account.data,
				role: account.data.role?.id,
				department: account.data.department?.id,
				username: oldAccount.data?.username,
			},
		})

		expect(result.data).toEqual(new UsernameInUseError())
	}
})

test("Should throw an error if id invalid", async () => {
	const hashAdapter = new BcryptAdapter(8)
	const uuidAdapter = new UuidAdapter()
	const usersRepository = new InMemoryUsersRepository()
	const contactsRepository = new InMemoryContactsRepository()
	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbLoadContactByIdRepository = new DbLoadContactById(contactsRepository)

	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)

	const dbUpdateAccount = new DbUpdateAccount(
		hashAdapter,
		dbLoadAccountById,
		dbLoadAccountByUsername,
		usersRepository
	)

	const dbUpdateContact = new DbUpdateContact(
		dbLoadContactByIdRepository,
		contactsRepository
	)

	const updateAccountController = new UpdateAccountController(
		dbUpdateAccount,
		dbCreateContact,
		makeCreateContactValidation(),
		dbUpdateContact,
		makeUpdateContactValidation()
	)

	const result = await updateAccountController.execute({
		id: "123",
		input: {},
	})

	expect(result.data).toEqual(new UserInvalidError())
})

test("Should update contact email", async () => {
	const hashAdapter = new BcryptAdapter(8)
	const uuidAdapter = new UuidAdapter()
	const usersRepository = new InMemoryUsersRepository()
	const contactsRepository = new InMemoryContactsRepository()

	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const dbLoadContactByIdRepository = new DbLoadContactById(contactsRepository)

	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		hashAdapter,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepository
	)

	const dbUpdateAccount = new DbUpdateAccount(
		hashAdapter,
		dbLoadAccountById,
		dbLoadAccountByUsername,
		usersRepository
	)

	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)

	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateContact,
		makeCreateContactValidation(),
		dbCreateAccount
	)

	const dbUpdateContact = new DbUpdateContact(
		dbLoadContactByIdRepository,
		contactsRepository
	)

	const updateAccountController = new UpdateAccountController(
		dbUpdateAccount,
		dbCreateContact,
		makeCreateContactValidation(),
		dbUpdateContact,
		makeUpdateContactValidation()
	)

	const account = await createAccountController.execute({
		input: {
			email: "newuser@test.com",
			password: "ola",
			profile: {
				firstName: faker.name.firstName(),
			},
			username: faker.name.middleName(),
			contact: {
				id: await uuidAdapter.generate(),
				name: "Contact",
				phone: "917262333",
				prefix: "+351",
				email: "contact@email.com",
				country: "Portugal",
				default: true,
			},
		},
	})

	if (account?.data?.id && account.data.contact) {
		expect(account.data.profile.firstName).not.toBeNull()

		const result = await updateAccountController.execute({
			id: account.data.id,
			input: {
				...account.data,
				role: account.data.role?.id,
				department: account.data.department?.id,
				profile: {
					firstName: "José",
				},
				password: "teste",
				contact: {
					...account.data.contact,
					email: "contact@updated.com",
				},
			},
		})

		expect(result?.data?.profile.firstName).toEqual("José")
		expect(result?.data?.password).not.toEqual(account.data.password)
		expect(result.data?.contact?.email).toEqual("contact@updated.com")
	}
})
