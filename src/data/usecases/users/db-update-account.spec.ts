import { UsernameInUseError } from "@/data/errors/username-in-use-error"
import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { faker } from "@faker-js/faker"
import { expect, test } from "vitest"
import { DbCreateAccount } from "./db-create-account"
import { DbUpdateAccount } from "./db-update-account"
import { DbLoadAccountByEmail } from "./load-account-by-email"
import { DbLoadAccountById } from "./load-account-by-id"
import { DbLoadAccountByUsername } from "./load-account-by-username"

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

	const account = await dbCreateAccount.create({
		email: "newuser@test.com",
		password: "ola",
		profile: {
			firstName: faker.name.firstName(),
		},
		username: faker.name.middleName(),
	})

	if (account?.id) {
		expect(account.profile.firstName).not.toBeNull()

		const result = await dbUpdateAccount.update(account.id, {
			...account,
			role: account.role?.id,
			department: account.department?.id,
			profile: {
				firstName: "José",
			},
			password: "teste",
		})

		expect(result?.profile.firstName).toEqual("José")
		expect(result?.password).not.toEqual(account.password)
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

	const account = await dbCreateAccount.create({
		email: "newuser@test.com",
		password: "ola",
		profile: {
			firstName: faker.name.firstName(),
		},
		username: faker.name.middleName(),
	})

	if (account?.id) {
		expect(account.profile.firstName).not.toBeNull()

		const result = await dbUpdateAccount.update(account.id, {
			...account,
			role: account.role?.id,
			department: account.department?.id,
			username: "teste",
		})

		expect(result?.username).toEqual("teste")
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

	const oldAccount = await dbCreateAccount.create({
		email: "newuser1@test.com",
		password: "ola",
		profile: {
			firstName: faker.name.firstName(),
		},
		username: faker.name.middleName(),
	})

	const account = await dbCreateAccount.create({
		email: "newuser@test.com",
		password: "ola",
		profile: {
			firstName: faker.name.firstName(),
		},
		username: faker.name.middleName(),
	})

	if (account?.id) {
		expect(account.profile.firstName).not.toBeNull()
		expect(
			dbUpdateAccount.update(account.id, {
				...account,
				role: account.role?.id,
				department: account.department?.id,
				username: oldAccount?.username,
			})
		).rejects.toThrow(new UsernameInUseError())
	}
})
