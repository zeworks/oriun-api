import { UsersEntity } from "@/domain/entities/users";
import { CreateAccountUseCaseFunction } from "@/domain/usecases/users/create-account";
import { LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email";
import { LoadAccountByUsernameUseCaseFunction } from "@/domain/usecases/users/load-account-by-username";
import { CreateAccountRepository } from "./create-account-repository";
import { LoadAccountByEmailRepository } from "./load-account-by-email-repository";
import { LoadAccountByUsernameRepository } from "./load-account-by-username-repository";
import { UpdateTokenRepository, UpdateTokenRepositoryFunction } from "./update-token-repository";

export class InMemoryUsersRepository implements LoadAccountByEmailRepository, CreateAccountRepository, UpdateTokenRepository, LoadAccountByUsernameRepository {

  users: any[] = [];

  loadByEmail: LoadAccountByEmailUseCaseFunction = async (email) => {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  loadByUsername: LoadAccountByUsernameUseCaseFunction = async (username) => {
    const user = this.users.find(user => user.username === username);
    return user;
  }

  create: CreateAccountUseCaseFunction = async (input) => {
    const data = input;
    this.users.push(data);
    
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      status: data.status,
      password: data.password,
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

  updateToken: UpdateTokenRepositoryFunction = (userId, token) => {
    const user = this.users.find(u => u.id === userId);

    Object.assign(user, {
      accessToken: token
    });

    return user;
  }
}
