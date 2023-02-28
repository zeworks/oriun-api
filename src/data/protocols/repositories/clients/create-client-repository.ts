import { CreateClientUseCase } from "@/domain/usecases/clients/create-client-usecase"

export type CreateClientRepository = {
	create: CreateClientRepositoryFn
}

export type CreateClientRepositoryFn = (
	input: CreateClientRepository.Input
) => Promise<CreateClientRepository.Output>

export namespace CreateClientRepository {
	export type Input = CreateClientUseCase.Input & {
		id: string
	}
	export type Output = CreateClientUseCase.Output
}
