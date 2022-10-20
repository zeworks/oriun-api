import { UsersEntity } from "@/domain/entities/users";
import { CreateAccountUseCaseFunction } from "@/domain/usecases/users/create-account";
import { LoadAccountByEmailUseCaseFunction } from "@/domain/usecases/users/load-account-by-email";
import { LoadAccountByIdUseCaseFunction } from "@/domain/usecases/users/load-account-by-id";
import { LoadAccountByTokenUseCaseFunction } from "@/domain/usecases/users/load-account-by-token";
import { LoadAccountByUsernameUseCaseFunction } from "@/domain/usecases/users/load-account-by-username";
import { CreateAccountRepository } from "./create-account-repository";
import { LoadAccountByEmailRepository } from "./load-account-by-email-repository";
import { LoadAccountByIdRepository } from "./load-account-by-id-repository";
import { LoadAccountByTokenRepository } from "./load-account-by-token-repository";
import { LoadAccountByUsernameRepository } from "./load-account-by-username-repository";
import { UpdateTokenRepository, UpdateTokenRepositoryFunction } from "./update-token-repository";

export class InMemoryUsersRepository implements LoadAccountByEmailRepository, CreateAccountRepository, UpdateTokenRepository, LoadAccountByUsernameRepository, LoadAccountByTokenRepository, LoadAccountByIdRepository {

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
    const data = {
      ...input,
      profile: {
        firstName: input?.profile?.firstName,
        lastName: input?.profile?.lastName,
        picture: input?.profile?.picture
      },
      role: input?.role ? {
        id: input?.role,
        key: `role_key_${input?.role}`,
        name: `Role name ${input?.role}`,
        status: true
      } : null,
      department: input?.department ? {
        id: input?.department,
        name: `department name ${input?.department}`,
        status: true
      } : null,
    };
    this.users.push(data);

    return {
      id: data.id!,
      email: data.email,
      username: data.username,
      status: data.status,
      password: data.password,
      identificationNumber: data.identificationNumber,
      profile: data.profile,
      role: data.role,
      department: data.department
    };
  }

  updateToken: UpdateTokenRepositoryFunction = (userId, token) => {
    const user = this.users.find(u => u.id === userId);

    Object.assign(user, {
      accessToken: token
    });

    return user;
  }

  loadToken: LoadAccountByTokenUseCaseFunction = (token) => {
    return this.users.find(u => u.accessToken === token);
  }

  loadById: LoadAccountByIdUseCaseFunction = (id) => {
    return this.users.find(u => u.id === id);
  }
}
