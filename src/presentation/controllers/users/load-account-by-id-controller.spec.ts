import { UserInvalidError } from "@/data/errors/user-invalid-error"
import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbCreateAccount } from "@/data/usecases/users/create-account"
import { DbLoadAccountById } from "@/data/usecases/users/load-account-by-id"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { expect, test } from "vitest"
import { CreateAccountController } from "./create-account-controller"
import { LoadAccountByIdController } from "./load-account-by-id-controller"

test("Should load the account details with success", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const uuidAdapter = new UuidAdapter()
	const encrypter = new BcryptAdapter(12)
	const createAccountDb = new DbCreateAccount(
		uuidAdapter,
		encrypter,
		usersRepository,
		usersRepository,
		usersRepository
	)
	const createAccountController = new CreateAccountController(
		makeCreateAccountValidation(),
		createAccountDb
	)

	const account = await createAccountController.execute({
		input: {
			email: "test@test.com",
			username: "user-test",
			password: "user-test",
			status: true,
			profile: {
				firstName: "UserTest",
			},
		},
	})

	const loadAccountByIdUseCase = new DbLoadAccountById(usersRepository)
	const loadAccountByIdController = new LoadAccountByIdController(
		loadAccountByIdUseCase
	)

	const result = await loadAccountByIdController.execute(undefined, {
		accountId: account.data?.id,
	})

	expect(result.data?.email).toEqual("test@test.com")
})

test("Should throw an error if invalid user id", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const loadAccountByIdUseCase = new DbLoadAccountById(usersRepository)
	const loadAccountByIdController = new LoadAccountByIdController(
		loadAccountByIdUseCase
	)

	const result = await loadAccountByIdController.execute(undefined, {
		accountId: "123",
	})

	expect(result.data).toEqual(new UserInvalidError())
})

test("Should throw an error if empty accountId", async () => {
	const usersRepository = new InMemoryUsersRepository()
	const loadAccountByIdUseCase = new DbLoadAccountById(usersRepository)
	const loadAccountByIdController = new LoadAccountByIdController(
		loadAccountByIdUseCase
	)

	const result = await loadAccountByIdController.execute()

	expect(result.data).toEqual(new MissingParamError("authorization"))
})
