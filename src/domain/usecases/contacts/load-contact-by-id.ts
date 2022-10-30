import { ContactsEntity } from "@/domain/entities/contacts";

export interface LoadContactByIdUseCase {
  loadById: LoadContactByIdUseCaseFunction
}

export type LoadContactByIdUseCaseFunction = (id: string) => Promise<LoadContactByIdUseCase.Result>;

export namespace LoadContactByIdUseCase {
  export type Result = ContactsEntity | null;
}
