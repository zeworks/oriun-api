import { DEFAULT_JWT_SECRET } from "@/config/jwt"
import { UserInvalidError } from "@/data/errors/user-invalid-error"
import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbCreateAuthentication } from "@/data/usecases/authentication/create-authentication-usecase"
import { DbCreateAccount } from "@/data/usecases/users/db-create-account"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateAuthenticationValidation } from "@/main/factories/controllers/authentication/create-authentication-controller-validation"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { expect, test } from "vitest"
import { CreateAccountController } from "../users/create-account-controller"
import { CreateAuthenticationController } from "./create-authentication-controller"

const usersRepository = new InMemoryUsersRepository()

const makeDbCreateAuthenticationUseCase = () => {
	const loadByEmail = new DbLoadAccountByEmail(usersRepository)
	const encrypter = new JwtAdapter(DEFAULT_JWT_SECRET)
	const hashComparer = new BcryptAdapter(12)
	return new DbCreateAuthentication(
		loadByEmail,
		hashComparer,
		encrypter,
		usersRepository
	)
}

const makeCreateAccountController = () => {
	const loadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const loadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
	const uuidAdapter = new UuidAdapter()
	const encrypter = new BcryptAdapter(12)
	const createAccount = new DbCreateAccount(
		uuidAdapter,
		encrypter,
		loadAccountByEmail,
		loadAccountByUsername,
		usersRepository
	)

	return new CreateAccountController(
		makeCreateAccountValidation(),
		createAccount
	)
}

test("Should create authentication with success", async () => {
	const user = await makeCreateAccountController().execute({
		input: {
			email: "johndoe@mail.com",
			username: "johndoe",
			password: "usernovo",
			status: true,
			profile: {
				firstName: "John",
			},
		},
	})

	const { execute: createAuthentication } = new CreateAuthenticationController(
		makeCreateAuthenticationValidation(),
		makeDbCreateAuthenticationUseCase()
	)

	if (user.data) {
		const auth = await createAuthentication({
			email: user.data?.email,
			password: "usernovo",
		})

		expect(auth.data?.accessToken).not.toBe(undefined)
	}
})

test("Should not create authentication if user is not active (status as false)", async () => {
	const user = await makeCreateAccountController().execute({
		input: {
			email: "johndo2e@mail.com",
			username: "johndoe2",
			password: "usernovo",
			profile: {
				firstName: "John",
			},
		},
	})

	const { execute: createAuthentication } = new CreateAuthenticationController(
		makeCreateAuthenticationValidation(),
		makeDbCreateAuthenticationUseCase()
	)

	if (user.data) {
		const auth = await createAuthentication({
			email: user.data?.email,
			password: "usernovo",
		})
		expect(auth.data).toEqual(new UserInvalidError())
	}
})

test("Should not create authentication if user password is invalid", async () => {
	const user = await makeCreateAccountController().execute({
		input: {
			email: "johndo2e2q@mail.com",
			username: "johndoe2 22",
			password: "usernovo",
			profile: {
				firstName: "John",
			},
		},
	})

	const { execute: createAuthentication } = new CreateAuthenticationController(
		makeCreateAuthenticationValidation(),
		makeDbCreateAuthenticationUseCase()
	)

	if (user.data?.email) {
		const auth = await createAuthentication({
			email: user.data?.email,
			password: "usernovoq",
		})
		expect(auth.data).toEqual(new UserInvalidError())
	}
})
