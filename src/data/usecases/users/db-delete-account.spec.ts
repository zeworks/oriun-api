import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { assertType, expect, expectTypeOf, test } from "vitest"
import { DbDeleteAccount } from "./db-delete-account"
import { DbCreateAccount } from "./db-create-account"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { DbLoadAccountById } from "./load-account-by-id"
import { UserInvalidError } from "@/data/errors/user-invalid-error"
import { DbLoadAccountByEmail } from "./load-account-by-email"
import { DbLoadAccountByUsername } from "./load-account-by-username"

test("Should delete account with success", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const uuidAdapter = new UuidAdapter()
	const bcrypt = new BcryptAdapter(8)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		bcrypt,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepository
	)

	const user = await dbCreateAccount.create({
		email: "jose@teste.com",
		profile: {
			firstName: "Jose",
		},
		username: "jose_user",
	})

	await dbCreateAccount.create({
		email: "jose2@teste.com",
		profile: {
			firstName: "Jose",
		},
		username: "jose_user2",
	})

	if (user?.id) {
		const dbLoadAccount = new DbLoadAccountById(usersRepository)
		const dbDeleteAccount = new DbDeleteAccount(dbLoadAccount, usersRepository)
		const result = await dbDeleteAccount.delete(user?.id)
		expect(result).toEqual(true)
	}
})

test("Should throw error invalid user", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const dbLoadAccount = new DbLoadAccountById(usersRepository)
	const dbDeleteAccount = new DbDeleteAccount(dbLoadAccount, usersRepository)
	try {
		return await dbDeleteAccount.delete("123")
	} catch (error) {
		expect(error).toEqual(new UserInvalidError())
	}
})
