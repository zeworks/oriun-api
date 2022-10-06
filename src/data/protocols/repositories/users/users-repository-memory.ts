import { UsersEntity } from "@/domain/entities/users";
import { LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email";
import { LoadAccountByEmailRepository } from "./load-account-by-email-repository";

export class InMemoryUsersRepository implements LoadAccountByEmailRepository {

  users: UsersEntity[] = [];

  loadByEmail: LoadAccountByEmailUseCaseFunction = async (email) => {
    return this.users.find(user => user.email === email);
  }
}
