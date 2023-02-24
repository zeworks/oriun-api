import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { expect, test } from "vitest"
import { LoadAccountsController } from "./load-accounts-controller"
import { DbLoadAccounts } from "@/data/usecases/users/db-load-accounts"
import { CreateAccountController } from "./create-account-controller"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { DbCreateAccount } from "@/data/usecases/users/db-create-account"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"

test("Should return an empty list of users", async () => {
	const usersRepository = new InMemoryUsersRepository()

	const dbLoadAccounts = new DbLoadAccounts(usersRepository)
	const loadAccountsController = new LoadAccountsController(dbLoadAccounts)

	const result = await loadAccountsController.execute()
	expect(result.data.length).toEqual(0)
})

test("Should return a list with two users", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const uuidAdapter = new UuidAdapter()
	const bcrypt = new BcryptAdapter(8)

	const dbLoadAccounts = new DbLoadAccounts(usersRepository)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		bcrypt,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepository
	)

	const loadAccountsController = new LoadAccountsController(dbLoadAccounts)
	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateAccount
	)

	await createAccountController.execute({
		input: {
			email: "test@test.com",
			username: "test",
			profile: {
				firstName: "TestName",
			},
		},
	})

	await createAccountController.execute({
		input: {
			email: "test2@test.com",
			username: "test2",
			profile: {
				firstName: "TestName",
			},
		},
	})

	const result = await loadAccountsController.execute()
	expect(result.data.length).toEqual(2)
})
