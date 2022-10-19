import { UsersEntity } from "@/domain/entities/users";

export interface LoadAccountByTokenUseCase {
  loadToken: LoadAccountByTokenUseCaseFunction
}

export type LoadAccountByTokenUseCaseFunction = (token: string, role?: string) => Promise<LoadAccountByTokenUseCase.Result>;

export namespace LoadAccountByTokenUseCase {
  export type Result = UsersEntity | null;
}
