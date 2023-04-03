import { DbDeleteAuthentication } from "@/data/usecases/authentication/db-delete-authentication-usecase"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository"
import { makeLoadAccountByIdUseCase } from "../users/load-account-by-id-usecase-factory"

export const makeDeleteAuthenticationUseCase = () => {
	const usersRespository = new UsersRepository()
	return new DbDeleteAuthentication(
		makeLoadAccountByIdUseCase(),
		usersRespository
	)
}
