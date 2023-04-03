import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbDeleteAuthentication } from "@/data/usecases/authentication/db-delete-authentication-usecase"
import { DbLoadAccountById } from "@/data/usecases/users/load-account-by-id"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { HttpStatusCode } from "@/presentation/protocols/http"
import { expect, test } from "vitest"
import { DeleteAuthenticationController } from "./delete-authentication-controller"

test("Should delete authentication access token from user with success", async () => {
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

	const deleteAuthenticationController = new DeleteAuthenticationController(
		dbDeleteAuthenticationUseCase
	)

	const result = await deleteAuthenticationController.execute(null, {
		accountId: "1234",
	})

	expect(result.data).toEqual(true)
	expect(result.statusCode).toEqual(200)
})

test("Should NOT delete authentication if invalid account id", async () => {
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

	const deleteAuthenticationController = new DeleteAuthenticationController(
		dbDeleteAuthenticationUseCase
	)

	const result = await deleteAuthenticationController.execute(null, {
		accountId: "12",
	})

	expect(result.data).toEqual(null)
	expect(result.statusCode).toEqual(HttpStatusCode.NO_CONTENT)
})
