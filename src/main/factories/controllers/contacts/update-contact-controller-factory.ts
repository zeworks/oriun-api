import { UpdateContactController } from "@/presentation/controllers/contacts/update-contact-controller"
import { makeUpdateContactUseCase } from "../../usecases/contacts/update-contact-usecase-factory"

export const makeUpdateContactController = () => {
	return new UpdateContactController(makeUpdateContactUseCase())
}
