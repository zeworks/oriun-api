import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory";
import { expect, test } from "vitest";
import { LoadAccountsController } from "./load-accounts-controller";
import { DbLoadAccounts } from "@/data/usecases/users/db-load-accounts";
import { CreateAccountController } from "./create-account-controller";
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory";
import { DbCreateAccount } from "@/data/usecases/users/create-account";
import { UuidAdapter } from "@/infra/cryptography/uuid";
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter";

test("Should return an empty list of users", async () => {
  const usersRepository = new InMemoryUsersRepository();

  const dbLoadAccounts = new DbLoadAccounts(usersRepository);
  const loadAccountsController = new LoadAccountsController(dbLoadAccounts);

  const result = await loadAccountsController.execute();
  expect(result.data.length).toEqual(0);
})

test("Should return a list with two users", async () => {
  const usersRepository = new InMemoryUsersRepository();
  const uuidAdapter = new UuidAdapter();
  const bcrypt = new BcryptAdapter(8);

  const dbLoadAccounts = new DbLoadAccounts(usersRepository);
  const dbCreateAccount = new DbCreateAccount(uuidAdapter, bcrypt, usersRepository, usersRepository, usersRepository);
  
  const loadAccountsController = new LoadAccountsController(dbLoadAccounts);
  const createAccountController = new CreateAccountController(makeCreateAccountValidation(), dbCreateAccount);

  await createAccountController.execute({
    input: {
      email: "test@test.com",
      username: "test",
      profile: {
        firstName: "TestName"
      }
    }
  })

  await createAccountController.execute({
    input: {
      email: "test2@test.com",
      username: "test2",
      profile: {
        firstName: "TestName"
      }
    }
  })

  const result = await loadAccountsController.execute();
  expect(result.data.length).toEqual(2);
})
