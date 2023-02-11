import { EmailInUseError } from "@/data/errors/email-in-use-error"
import { UsernameInUseError } from "@/data/errors/username-in-use-error"
import { Hasher } from "@/data/protocols/cryptography/hasher"
import { Uuid } from "@/data/protocols/cryptography/uuid"
import { CreateAccountRepository } from "@/data/protocols/repositories/users/create-account-repository"
import {
	CreateAccountUseCase,
	CreateAccountUseCaseFunction,
} from "@/domain/usecases/users/create-account"
import { DbLoadAccountByEmail } from "./load-account-by-email"
import { DbLoadAccountByUsername } from "./load-account-by-username"

export class DbCreateAccount implements CreateAccountUseCase {
	constructor(
		private readonly uuidAdapter: Uuid,
		private readonly hashGenerator: Hasher,
		private readonly loadAccountByEmail: DbLoadAccountByEmail,
		private readonly loadAccountByUsername: DbLoadAccountByUsername,
		private readonly createAccount: CreateAccountRepository
	) { }

	create: CreateAccountUseCaseFunction = async (data) => {
		try {
			const emailAlreadyExists = await this.loadAccountByEmail.loadByEmail(
				data.email
			)

			if (emailAlreadyExists) throw new EmailInUseError()

			const usernameAlreadyExists =
				await this.loadAccountByUsername.loadByUsername(data.username)

			if (usernameAlreadyExists) throw new UsernameInUseError()

			const id = await this.uuidAdapter.generate()

			let password = ""
			if (data.password) password = await this.hashGenerator.hash(data.password)

			const result = await this.createAccount.create({
				...data,
				id,
				password,
				status: data.status ?? false,
			})

			return result
		} catch (error) {
			throw error
		}
	}
}
