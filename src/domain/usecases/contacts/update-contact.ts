import { ContactsEntity } from "@/domain/entities/contacts";

export interface UpdateContactUseCase {
  update: UpdateContactUseCaseFunction
}

export type UpdateContactUseCaseFunction = (input: UpdateContactUseCase.Params) => Promise<UpdateContactUseCase.Result>;

export namespace UpdateContactUseCase {
  export type Params = Partial<ContactsEntity> & {
    id: string;
  };
  export type Result = ContactsEntity | null;
}
