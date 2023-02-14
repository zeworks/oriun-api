import { AuthMiddleware } from "@/presentation/middlewares/auth-middleware"
import { Middleware } from "@/presentation/protocols/middleware"
import { makeLoadAccountByTokenUseCase } from "../usecases/users/load-account-by-token-usecase-factory"
import { makeAuthMiddlewareValidation } from "./auth-middleware-validation"

export const makeAuthMiddleware = (): Middleware => {
	return new AuthMiddleware(
		makeLoadAccountByTokenUseCase(),
		makeAuthMiddlewareValidation()
	)
}
