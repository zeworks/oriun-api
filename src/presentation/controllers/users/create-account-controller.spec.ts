import { EmailInUseError } from "@/data/errors/email-in-use-error"
import { UsernameInUseError } from "@/data/errors/username-in-use-error"
import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbCreateAccount } from "@/data/usecases/users/create-account"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { v4 } from "uuid"
import { CreateAccountController } from "./create-account-controller"


describe('[CONTROLLER] Create Account', () => {
  it('Should create account with success', async () => {

    const usersRepository = new InMemoryUsersRepository();
    const loadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
    const loadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
    const uuidAdapter = new UuidAdapter();
    const encrypter = new BcryptAdapter(12);
    const createAccountUseCase = new DbCreateAccount(uuidAdapter, encrypter, loadAccountByEmail, loadAccountByUsername, usersRepository);

    const createAccount = new CreateAccountController(makeCreateAccountValidation(), createAccountUseCase);

    const account = await createAccount.execute({
      input: {
        id: v4(),
        email: "johndoe@mail.com",
        username: "johndoe",
        profile: {
          firstName: "John"
        }
      }
    })

    expect(account.data?.username).toEqual("johndoe");
    expect(account.data?.email).toEqual("johndoe@mail.com");
  })

  it('Should not create account if email exists', async () => {

    const usersRepository = new InMemoryUsersRepository();
    const loadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
    const loadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
    const uuidAdapter = new UuidAdapter();
    const encrypter = new BcryptAdapter(12);
    const createAccountUseCase = new DbCreateAccount(uuidAdapter, encrypter, loadAccountByEmail, loadAccountByUsername, usersRepository);

    await new CreateAccountController(makeCreateAccountValidation(), createAccountUseCase).execute({
      input: {
        id: v4(),
        email: "johndoe@mail.com",
        username: "johndoe",
        profile: {
          firstName: "John"
        }
      }
    })

    const account = await new CreateAccountController(makeCreateAccountValidation(), createAccountUseCase).execute({
      input: {
        id: v4(),
        email: "johndoe@mail.com",
        username: "johndoe",
        profile: {
          firstName: "John"
        }
      }
    });
    
    expect(account.data).toEqual(new EmailInUseError())
    expect(account.statusCode).toEqual(500)
  })

  it('Should not create account if username exists', async () => {

    const usersRepository = new InMemoryUsersRepository();
    const loadAccountByEmail = new DbLoadAccountByEmail(usersRepository)
    const loadAccountByUsername = new DbLoadAccountByUsername(usersRepository)
    const uuidAdapter = new UuidAdapter();
    const encrypter = new BcryptAdapter(12);
    const createAccountUseCase = new DbCreateAccount(uuidAdapter, encrypter, loadAccountByEmail, loadAccountByUsername, usersRepository);

    await new CreateAccountController(makeCreateAccountValidation(), createAccountUseCase).execute({
      input: {
        id: v4(),
        email: "johndoe@mail.com",
        username: "johndoe",
        profile: {
          firstName: "John"
        }
      }
    })

    const account = await new CreateAccountController(makeCreateAccountValidation(), createAccountUseCase).execute({
      input: {
        id: v4(),
        email: "johndoe1@mail.com",
        username: "johndoe",
        profile: {
          firstName: "John"
        }
      }
    });

    expect(account.data).toEqual(new UsernameInUseError())
    expect(account.statusCode).toEqual(500)
  })
})
