import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateAccount } from "./db-create-account"
import { DbLoadAccountByEmail } from "./load-account-by-email"
import { DbLoadAccountByUsername } from "./load-account-by-username"

test("Should create an account with success", async () => {
	const usersRepostory = new InMemoryUsersRepository()

	const uuidAdapter = new UuidAdapter()
	const bcryptAdapter = new BcryptAdapter(8)

	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepostory)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepostory)

	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		bcryptAdapter,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepostory
	)

	const result = await dbCreateAccount.create({
		email: "email@test.com",
		profile: {
			firstName: "John Doe",
		},
		username: "JohnDoe",
	})

	expect(result?.email).toEqual("email@test.com")
	expect(result?.profile.firstName).toEqual("John Doe")
	expect(result?.username).toEqual("JohnDoe")
})
