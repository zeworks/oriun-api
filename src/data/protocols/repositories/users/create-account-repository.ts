import { CreateAccountUseCaseFunction } from "@/domain/usecases/users/create-account";

export interface CreateAccountRepository {
  create: CreateAccountUseCaseFunction
}
