import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { expect, test } from "vitest"
import { DbLoadAccountById } from "../users/load-account-by-id"
import { DbDeleteAuthentication } from "./db-delete-authentication-usecase"

test("Should delete access token with success", async () => {
	const usersRespository = new InMemoryUsersRepository()

	const password = await new BcryptAdapter(8).hash("ola")

	usersRespository.users = [
		{
			email: "user@email.com",
			id: "1234",
			profile: {
				firstName: "User First Name",
			},
			username: "user_username",
			password,
			status: true,
			accessToken: "TOKEN_DUMMY",
		},
	]

	const dbLoadAccountById = new DbLoadAccountById(usersRespository)

	const dbDeleteAuthenticationUseCase = new DbDeleteAuthentication(
		dbLoadAccountById,
		usersRespository
	)

	const result = await dbDeleteAuthenticationUseCase.deleteToken("1234")
	expect(result).toEqual(true)
})

test("Should not delete access token with success if invalid account id", async () => {
	const usersRespository = new InMemoryUsersRepository()

	const password = await new BcryptAdapter(8).hash("ola")
	const dbLoadAccountById = new DbLoadAccountById(usersRespository)

	usersRespository.users = [
		{
			email: "user@email.com",
			id: "1234",
			profile: {
				firstName: "User First Name",
			},
			username: "user_username",
			password,
			status: true,
			accessToken: "TOKEN_DUMMY",
		},
	]

	const dbDeleteAuthenticationUseCase = new DbDeleteAuthentication(
		dbLoadAccountById,
		usersRespository
	)

	const result = await dbDeleteAuthenticationUseCase.deleteToken("123")
	expect(result).toEqual(null)
})
