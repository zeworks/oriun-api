import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { assertType, expect, expectTypeOf, test } from "vitest"
import { DbDeleteAccount } from "./db-delete-account"
import { DbCreateAccount } from "./create-account"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { DbLoadAccountById } from "./load-account-by-id"
import { UserInvalidError } from "@/data/errors/user-invalid-error"

test("Should delete account with success", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const uuidAdapter = new UuidAdapter()
	const bcrypt = new BcryptAdapter(8)
	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		bcrypt,
		usersRepository,
		usersRepository,
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
	const result = dbDeleteAccount.delete("123")
	expect(result).rejects.toThrow(new UserInvalidError().message)
})
