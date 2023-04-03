import { DeleteAuthenticationController } from "@/presentation/controllers/authentication/delete-authentication-controller"
import { makeDeleteAuthenticationUseCase } from "../../usecases/authentication/delete-authentication-usecase-factory"

export const makeDeleteAuthenticationController = () => {
	return new DeleteAuthenticationController(makeDeleteAuthenticationUseCase())
}
