import { LoadClientByIdController } from "@/presentation/controllers/clients/load-client-id-controller"
import { makeLoadClientByIdUseCase } from "../../usecases/clients/load-client-by-id-usecase-factory"

export const makeLoadClientByIdController = () => {
	return new LoadClientByIdController(makeLoadClientByIdUseCase())
}
