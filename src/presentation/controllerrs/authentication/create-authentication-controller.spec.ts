import { InMemoryUsersRepository } from "@/data/protocols/repositories/users/users-repository-memory"
import { DbCreateAuthentication } from "@/data/usecases/authentication/create-authentication-usecase"
import { DbUpdateAuthenticationToken } from "@/data/usecases/authentication/update-authentication-token-usecase"
import { DbLoadAccountByEmail } from "@/data/usecases/users/load-account-by-email"
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter"
import { JwtAdapter } from "@/infra/cryptography/jwt-adapter"
import { makeCreateAuthenticationValidation } from "@/main/factories/controllers/authentication/create-authentication-controller-validation"
import { CreateAuthenticationController } from "./create-authentication-controller"

const usersRepository = new InMemoryUsersRepository();

const makeDbCreateAuthenticationUseCase = () => {
  const loadByEmail = new DbLoadAccountByEmail(usersRepository);
  const hashComparer = new JwtAdapter(process.env.JWT_SECRET!);
  const encrypter = new BcryptAdapter(12);
  const updateTokenRepository = new DbUpdateAuthenticationToken(hashComparer, usersRepository);
  return new DbCreateAuthentication(loadByEmail, encrypter, updateTokenRepository)
}

// const makeCreateAccountController = () => {

//   const loadAccountByEmail = new DbLoadAccountByEmail()
//   const uuidAdapter = new UuidAdapter();
//   const createAccount = new DbCreateAccount(uuidAdapter, )

//   return new CreateAccountController(
//     makeCreateAccountValidation(),
//   )
// }

describe('[Controller] Create Authentication Controller', () => {
  it('Should create authentication with success', async () => {
    const { execute } = new CreateAuthenticationController(
      makeCreateAuthenticationValidation(),
      makeDbCreateAuthenticationUseCase()
    )

    const data = await execute({
      email: "teste@tes.com",
      password: "ola"
    });

    console.log(data);
    
  })
})
