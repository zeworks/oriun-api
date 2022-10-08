import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbCreateAccount } from "@/data/usecases/users/create-account"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { Controller } from "@/presentation/protocols/controller"
import { v4 } from "uuid"
import { CreateAccountController } from "./create-account-controller"

const usersRepository = new InMemoryUsersRepository();

const makeCreateAccountController = () => {
  const loadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
  const loadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
  const uuidAdapter = new UuidAdapter();
  const createAccount = new DbCreateAccount(uuidAdapter, loadAccountByEmail, loadAccountByUsername, usersRepository);

  return new CreateAccountController(
    makeCreateAccountValidation(),
    createAccount
  )
}
describe('[CONTROLLER] Create Account', () => {
  it('Should create account with success', async () => {
    const { execute } = makeCreateAccountController();

    const account = await execute({
      input: {
        id: v4(),
        email: "johndoe@mail.com",
        username: "johndoe",
        profile: {
          firstName: "John"
        }
      }
    })

    console.log({ account });
    
  })
})
