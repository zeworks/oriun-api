import { CreateClientController } from "@/presentation/controllers/clients/create-client-controller"
import { makeCreateClientUseCase } from "../../usecases/clients/create-client-usecase-factory"
import { makeCreateClientControllerValidation } from "./create-client-controller-validation"

export const makeCreateClientController = () => {
	return new CreateClientController(
		makeCreateClientUseCase(),
		makeCreateClientControllerValidation()
	)
}
