import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { expect, test } from "vitest"
import { DbLoadAccounts } from "./db-load-accounts"
import { DbCreateAccount } from "./db-create-account"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { DbLoadAccountByEmail } from "./load-account-by-email"
import { DbLoadAccountByUsername } from "./load-account-by-username"

test("Should return an empty list of users", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const dbLoadAccounts = new DbLoadAccounts(usersRepository)
	const accounts = await dbLoadAccounts.loadAccounts()

	// expect an empty list/empty array
	expect(accounts.total).toEqual(0)
})

test("Should return a list with two users", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const uuidAdapter = new UuidAdapter()
	const hashGenerator = new BcryptAdapter(8)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	// 1. create two users
	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		hashGenerator,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepository
	)
	await dbCreateAccount.create({
		email: "test@test.com",
		username: "test-1",
		profile: {
			firstName: "UserName",
		},
	})

	await dbCreateAccount.create({
		email: "test2@test.com",
		username: "test-2",
		profile: {
			firstName: "UserName",
		},
	})

	// 2. load users created
	const dbLoadAccounts = new DbLoadAccounts(usersRepository)
	const users = await dbLoadAccounts.loadAccounts()

	// 3. result
	expect(users.total).toEqual(2)
})
