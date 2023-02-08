import { UsersEntity } from "@/domain/entities/users";

export type LoadAccountsUseCaseFunction = () => Promise<LoadAccountsUseCase.Result>;

export interface LoadAccountsUseCase {
  loadAccounts: LoadAccountsUseCaseFunction;
}

export namespace LoadAccountsUseCase {
  export type Result = Array<UsersEntity>
}
