import { UserInvalidError } from "@/data/errors/user-invalid-error"
import { UsernameInUseError } from "@/data/errors/username-in-use-error"
import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbCreateAccount } from "@/data/usecases/users/db-create-account"
import { DbUpdateAccount } from "@/data/usecases/users/db-update-account"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { DbLoadAccountById } from "@/data/usecases/users/load-account-by-id"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { faker } from "@faker-js/faker"
import { expect, test } from "vitest"
import { CreateAccountController } from "./create-account-controller"
import { UpdateAccountController } from "./update-account-controller"

test("Should update first name and password", async () => {
	const hashAdapter = new BcryptAdapter(8)
	const uuidAdapter = new UuidAdapter()
	const usersRepository = new InMemoryUsersRepository()
	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)

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

	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateAccount
	)

	const updateAccountController = new UpdateAccountController(dbUpdateAccount)

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
	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)

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

	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateAccount
	)

	const updateAccountController = new UpdateAccountController(dbUpdateAccount)

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
	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)

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

	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateAccount
	)

	const updateAccountController = new UpdateAccountController(dbUpdateAccount)

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
	const usersRepository = new InMemoryUsersRepository()
	const dbLoadAccountById = new DbLoadAccountById(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)

	const dbUpdateAccount = new DbUpdateAccount(
		hashAdapter,
		dbLoadAccountById,
		dbLoadAccountByUsername,
		usersRepository
	)

	const updateAccountController = new UpdateAccountController(dbUpdateAccount)

	const result = await updateAccountController.execute({
		id: "123",
		input: {},
	})

	expect(result.data).toEqual(new UserInvalidError())
})
