import { UsersEntity } from "@/domain/entities/users";

export interface LoadAccountByIdUseCase { 
  loadById: LoadAccountByIdUseCaseFunction
}

export type LoadAccountByIdUseCaseFunction = (id: string) => Promise<LoadAccountByIdUseCase.Result>
export namespace LoadAccountByIdUseCase {
  export type Result = UsersEntity | null;
}
