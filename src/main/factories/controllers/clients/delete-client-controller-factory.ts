import { DeleteClientController } from "@/presentation/controllers/clients/delete-client-controller"
import { makeDeleteClientUseCase } from "../../usecases/clients/delete-client-usecase-factory"

export const makeDeleteClientController = () => {
	return new DeleteClientController(makeDeleteClientUseCase())
}
