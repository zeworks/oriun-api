import { DbCreateAuthentication } from "@/data/usecases/authentication/create-authentication-usecase"
import { makeLoadAccountByEmail } from "../users/load-account-by-email-usecase-factory"

export const makeCreateAuthenticationUseCase = () => {
  const encrypter = new 
  return new DbCreateAuthentication(makeLoadAccountByEmail(), )
}
