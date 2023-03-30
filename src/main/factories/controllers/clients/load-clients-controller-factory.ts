import { LoadClientsController } from "@/presentation/controllers/clients/load-clients-controller"
import { makeLoadClientsUseCase } from "../../usecases/clients/load-clients-usecase-factory"

export const makeLoadClientsController = () => {
	return new LoadClientsController(makeLoadClientsUseCase())
}
