import { UpdateContactUseCaseFunction } from "@/domain/usecases/contacts/update-contact"

export interface UpdateContactRepository {
	update: UpdateContactUseCaseFunction
}
