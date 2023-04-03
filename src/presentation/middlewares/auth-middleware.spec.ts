import { DEFAULT_JWT_SECRET } from "@/config/jwt"
import { InMemoryRolesRepository } from "@/data/protocols/repositories/roles/roles-repository-memory"
import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbCreateAuthentication } from "@/data/usecases/authentication/create-authentication-usecase"
import { DbCreateRole } from "@/data/usecases/roles/create-role-usecase"
import { DbCreateAccount } from "@/data/usecases/users/db-create-account"
import { DbLoadAccountByToken } from "@/data/usecases/users/load-account-by-token"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateAuthenticationValidation } from "@/main/factories/controllers/authentication/create-authentication-controller-validation"
import { makeCreateRoleValidation } from "@/main/factories/controllers/roles/create-role-validation-factory"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { makeAuthMiddlewareValidation } from "@/main/factories/middlewares/auth-middleware-validation"
import { expect, test } from "vitest"
import { CreateAuthenticationController } from "../controllers/authentication/create-authentication-controller"
import { CreateRoleController } from "../controllers/roles/create-role-controller"
import { CreateAccountController } from "../controllers/users/create-account-controller"
import { AuthMiddleware } from "./auth-middleware"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"

test("Should have valid accesstoken", async () => {
	const rolesRepository = new InMemoryRolesRepository()
	const usersRepository = new InMemoryUsersRepository()
	const contactsRepository = new InMemoryContactsRepository()
	const encrypter = new JwtAdapter(DEFAULT_JWT_SECRET)
	const hashComparer = new BcryptAdapter(12)
	const dbLoadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
	const dbLoadAccountByUsername = new DbLoadAccountByUsername(usersRepository)

	const createAuthUseCase = new DbCreateAuthentication(
		usersRepository,
		hashComparer,
		encrypter,
		usersRepository
	)
	const createAuthentication = new CreateAuthenticationController(
		makeCreateAuthenticationValidation(),
		createAuthUseCase
	)

	const uuidAdapter = new UuidAdapter()
	const hasGenerator = new BcryptAdapter(12)
	const dbCreateAccount = new DbCreateAccount(
		uuidAdapter,
		hasGenerator,
		dbLoadAccountByEmail,
		dbLoadAccountByUsername,
		usersRepository
	)

	const createAccount = new CreateAccountController(
		makeCreateAccountValidation(),
		dbCreateAccount
	)
	const dbLoadAccountByToken = new DbLoadAccountByToken(
		encrypter,
		usersRepository
	)

	const authMiddleware = new AuthMiddleware(
		dbLoadAccountByToken,
		makeAuthMiddlewareValidation()
	)

	const dbCreateRole = new DbCreateRole(rolesRepository, rolesRepository)
	const createRole = new CreateRoleController(
		uuidAdapter,
		makeCreateRoleValidation(),
		dbCreateRole
	)

	const role = await createRole.execute({
		key: "bananas",
		name: "Admin Role",
		status: true,
	})

	if (role.data) {
		const account = await createAccount.execute({
			input: {
				email: "test@test.com",
				username: "test user",
				password: "test",
				status: true,
				role: role.data.id,
				profile: {
					firstName: "Test User",
				},
			},
		})

		if (account.data?.email && account.data.password) {
			const authentication = await createAuthentication.execute({
				email: account.data.email,
				password: "test",
			})

			const result = await authMiddleware.handle({
				accessToken: authentication.data?.accessToken!,
			})

			expect(result?.data?.accountId).toEqual(account.data.id)
			expect(result.data?.accountRole.key).toEqual(
				`role_key_${account.data.role?.id}`
			)
		}
	}
})
