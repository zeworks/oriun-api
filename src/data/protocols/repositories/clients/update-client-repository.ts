import { UpdateClientUseCaseFn } from "@/domain/usecases/clients/update-client-usecase"

export interface UpdateClientRepository {
	update: UpdateClientUseCaseFn
}
