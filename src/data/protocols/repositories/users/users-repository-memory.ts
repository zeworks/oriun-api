import { UsersEntity } from "@/domain/entities/users";
import { CreateAccountUseCaseFunction } from "@/domain/usecases/users/create-account";
import { LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email";
import { CreateAccountRepository } from "./create-account-repository";
import { LoadAccountByEmailRepository } from "./load-account-by-email-repository";

export class InMemoryUsersRepository implements LoadAccountByEmailRepository, CreateAccountRepository {

  users: any[] = [];

  loadByEmail: LoadAccountByEmailUseCaseFunction = async (email) => {
    return this.users.find(user => user.email === email);
  }

  create: CreateAccountUseCaseFunction = async (input) => {
    const data = input;
    this.users.push(data);
    
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      status: data.status,
      identificationNumber: data.identificationNumber,
      profile: {
        firstName: data.profile.firstName,
        lastName: data.profile.lastName,
        picture: data.profile.picture
      },
      role: data.role ? {
        id: data.role,
        key: `role_key_${data.role}`,
        name: `Role name ${data.role}`,
        status: true
      } : null
    };
  }
}
