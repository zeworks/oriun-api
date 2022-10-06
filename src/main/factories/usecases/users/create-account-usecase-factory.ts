import { DbCreateAccount } from "@/data/usecases/users/create-account"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { UsersRepository } from "@/infra/db/prisma/repos/users-repository";
import { makeLoadAccountByEmail } from "./load-account-by-email-usecase-factory";
import { makeLoadAccountByUsername } from "./load-account-by-username-usecase-factory";

export const makeDbCreateAccountUseCase = () => {
  const uuidAdapter = new UuidAdapter();
  const usersRepository = new UsersRepository();
  return new DbCreateAccount(
    uuidAdapter,
    makeLoadAccountByEmail(),
    makeLoadAccountByUsername(),
    usersRepository);
}
