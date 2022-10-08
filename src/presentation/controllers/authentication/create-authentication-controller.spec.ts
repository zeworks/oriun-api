import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbCreateAuthentication } from "@/data/usecases/authentication/create-authentication-usecase"
import { DbUpdateAuthenticationToken } from "@/data/usecases/authentication/update-authentication-token-usecase"
import { DbCreateAccount } from "@/data/usecases/users/create-account"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { DbLoadAccountByUsername } from "@/data/usecases/users/load-account-by-username"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateAuthenticationValidation } from "@/main/factories/controllers/authentication/create-authentication-controller-validation"
import { makeCreateAccountValidation } from "@/main/factories/controllers/users/create-account-validation-factory"
import { v4 } from "uuid"
import { CreateAccountController } from "../users/create-account-controller"
import { CreateAuthenticationController } from "./create-authentication-controller"

const usersRepository = new InMemoryUsersRepository();

const makeDbCreateAuthenticationUseCase = () => {
  const loadByEmail = new DbLoadAccountByEmail(usersRepository);
  const hashComparer = new JwtAdapter(process.env.JWT_SECRET!);
  const encrypter = new BcryptAdapter(12);
  const updateTokenRepository = new DbUpdateAuthenticationToken(hashComparer, usersRepository);
  return new DbCreateAuthentication(loadByEmail, encrypter, updateTokenRepository)
}

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

describe('[Controller] Create Authentication Controller', () => {
  it('Should create authentication with success', async () => {

    // create user
    const { execute: createUser } = makeCreateAccountController()

    // const { execute: createAuthentication } = new CreateAuthenticationController(
    //   makeCreateAuthenticationValidation(),
    //   makeDbCreateAuthenticationUseCase()
    // );

    const user = await createUser({
      input: {
        id: v4(),
        email: "johndoe@mail.com",
        username: "johndoe",
        profile: {
          firstName: "John"
        }
      }
    });

    console.log(user.data);
    
    
  })
})
