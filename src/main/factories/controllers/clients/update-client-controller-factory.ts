import { UpdateClientController } from "@/presentation/controllers/clients/update-client-controller"
import { makeUpdateClientUseCase } from "../../usecases/clients/update-client-usecase-factory"
import { makeUpdateClientControllerValidation } from "./update-client-controller-validation"

export const makeUpdateClientController = () => {
	return new UpdateClientController(
		makeUpdateClientUseCase(),
		makeUpdateClientControllerValidation()
	)
}
