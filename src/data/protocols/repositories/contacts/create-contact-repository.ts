import { CreateContactUseCase } from "@/domain/usecases/contacts/create-contact"

export interface CreateContactRepository {
  create: (input: CreateContactRepository.Params) => Promise<CreateContactRepository.Result>;
}

export namespace CreateContactRepository {
  export type Params = CreateContactUseCase.Params & {
    id: string;
  }
  export type Result = CreateContactUseCase.Result;
}
