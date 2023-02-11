import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { expect, test } from "vitest"
import { DbLoadAccounts } from "./db-load-accounts"
import { DbCreateAccount } from "./create-account"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"

test("Should return an empty list of users", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const dbLoadAccounts = new DbLoadAccounts(usersRepository)
	const accounts = await dbLoadAccounts.loadAccounts()

	// expect an empty list/empty array
	expect(accounts.length).toEqual(0)
})

test("Should return a list with two users", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const uuidAdapter = new UuidAdapter()
	const hashGenerator = new BcryptAdapter(8)

	// 1. create two users
	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		hashGenerator,
		usersRepository,
		usersRepository,
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
	expect(users.length).toEqual(2)
})
