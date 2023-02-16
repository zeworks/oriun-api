import { UserInvalidError } from "@/data/errors/user-invalid-error"
import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { expect, test } from "vitest"
import { DbLoadAccountById } from "./load-account-by-id"

test("Should throw an error if invalid account id", async () => {
	const usersRespository = new InMemoryUsersRepository()
	const loadAccount = new DbLoadAccountById(usersRespository)
	try {
		return await loadAccount.loadById("123")
	} catch (error) {
		expect(error).toEqual(new UserInvalidError())
	}
})
