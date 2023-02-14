import { CreateAuthenticationController } from "@/presentation/controllers/authentication/create-authentication-controller"
import { makeDbCreateAuthenticationUseCase } from "../../usecases/authentication/create-authentication-usecase-factory"
import { makeCreateAuthenticationValidation } from "./create-authentication-controller-validation"

export const makeCreateAuthenticationController = () => {
	return new CreateAuthenticationController(
		makeCreateAuthenticationValidation(),
		makeDbCreateAuthenticationUseCase()
	)
}
