import { DbCreateAccount } from "@/data/usecases/users/create-account"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { Controller } from "@/presentation/protocols/controller"
import { CreateAccountController } from "./create-account-controller"

// const makeCreateAccountController = (): Controller<CreateAccountController.RequestInput> => {
//   const uuidAdapter = new UuidAdapter();
//   // const LoadAccountByEmailRepository = new 
//   const createAccount = new DbCreateAccount(uuidAdapter)
//   return new CreateAccountController(null,)
// }

describe('[CONTROLLER] Create Account', () => {
  it('Should create account with success', async () => {
    
  })
})
