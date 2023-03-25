import {
	ClientCodeInUseError,
	ClientIdentificationNumberInUseError,
} from "@/data/errors/clients-error"
import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { DbCreateClientUseCase } from "@/data/usecases/clients/db-create-client-usecase"
import { DbLoadClientByCode } from "@/data/usecases/clients/db-load-client-by-code-usecase"
import { DbLoadClientByIdentificationNumber } from "@/data/usecases/clients/db-load-client-by-identificationNumber-usecase"
import { DbCreateCompany } from "@/data/usecases/companies/db-create-company"
import { DbCreateContact } from "@/data/usecases/contacts/db-create-contact"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { makeCreateClientValidation } from "@/main/factories/controllers/clients/create-client-validation-factory"
import { makeCreateCompanyValidation } from "@/main/factories/controllers/companies/create-company-controller-validation"
import { makeCreateContactValidation } from "@/main/factories/controllers/contacts/create-contact-controller-validation"
import { HttpStatusCode } from "@/presentation/protocols/http"
import { test, expect } from "vitest"
import { CreateCompanyController } from "../companies/create-company-controller"
import { CreateClientController } from "./create-client-controller"

test("Should create client with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()

	const makeLoadClientByCodeUseCase = () => {
		return new DbLoadClientByCode(clientsRepository)
	}

	const makeLoadClientByIdentificationNumberUseCase = () => {
		return new DbLoadClientByIdentificationNumber(clientsRepository)
	}

	const makeCreateClientUseCase = () => {
		const uuidAdapter = new UuidAdapter()
		return new DbCreateClientUseCase(
			uuidAdapter,
			makeLoadClientByCodeUseCase(),
			makeLoadClientByIdentificationNumberUseCase(),
			clientsRepository
		)
	}

	const makeCreateContactUseCase = () => {
		const uuidAdapter = new UuidAdapter()
		const contactsRepository = new InMemoryContactsRepository()
		return new DbCreateContact(uuidAdapter, contactsRepository)
	}

	const createClientController = new CreateClientController(
		makeCreateClientUseCase(),
		makeCreateClientValidation(),
		makeCreateContactUseCase(),
		makeCreateContactValidation()
	)

	const result = await createClientController.execute({
		code: "CODE-1",
		name: "PTC",
		identificationNumber: "PTC_1",
	})

	expect(result.statusCode).toEqual(HttpStatusCode.OK)
	expect(result.data?.code).toEqual("CODE-1")
	expect(result.data?.status).toEqual(false)
	expect(result.data?.company).toEqual(null)
})

test("Should throw an error if client code already exists", async () => {
	const clientsRepository = new InMemoryClientsRepository()

	const makeLoadClientByCodeUseCase = () => {
		return new DbLoadClientByCode(clientsRepository)
	}

	const makeLoadClientByIdentificationNumberUseCase = () => {
		return new DbLoadClientByIdentificationNumber(clientsRepository)
	}

	const makeCreateClientUseCase = () => {
		const uuidAdapter = new UuidAdapter()
		return new DbCreateClientUseCase(
			uuidAdapter,
			makeLoadClientByCodeUseCase(),
			makeLoadClientByIdentificationNumberUseCase(),
			clientsRepository
		)
	}

	const makeCreateContactUseCase = () => {
		const uuidAdapter = new UuidAdapter()
		const contactsRepository = new InMemoryContactsRepository()
		return new DbCreateContact(uuidAdapter, contactsRepository)
	}

	const createClientController = new CreateClientController(
		makeCreateClientUseCase(),
		makeCreateClientValidation(),
		makeCreateContactUseCase(),
		makeCreateContactValidation()
	)

	await createClientController.execute({
		code: "CODE-1",
		name: "PTC",
		identificationNumber: "PTC_1",
	})

	const result = await createClientController.execute({
		code: "CODE-1",
		name: "PTC",
		identificationNumber: "PTC_1",
	})

	expect(result.data).toEqual(new ClientCodeInUseError())
})

test("Should throw an error if client identification number already exists", async () => {
	const clientsRepository = new InMemoryClientsRepository()

	const makeLoadClientByCodeUseCase = () => {
		return new DbLoadClientByCode(clientsRepository)
	}

	const makeLoadClientByIdentificationNumberUseCase = () => {
		return new DbLoadClientByIdentificationNumber(clientsRepository)
	}

	const makeCreateClientUseCase = () => {
		const uuidAdapter = new UuidAdapter()
		return new DbCreateClientUseCase(
			uuidAdapter,
			makeLoadClientByCodeUseCase(),
			makeLoadClientByIdentificationNumberUseCase(),
			clientsRepository
		)
	}

	const makeCreateContactUseCase = () => {
		const uuidAdapter = new UuidAdapter()
		const contactsRepository = new InMemoryContactsRepository()
		return new DbCreateContact(uuidAdapter, contactsRepository)
	}

	const createClientController = new CreateClientController(
		makeCreateClientUseCase(),
		makeCreateClientValidation(),
		makeCreateContactUseCase(),
		makeCreateContactValidation()
	)

	await createClientController.execute({
		code: "CODE-1",
		name: "PTC",
		identificationNumber: "PTC_1",
	})

	const result = await createClientController.execute({
		code: "CODE-2",
		name: "PTC",
		identificationNumber: "PTC_1",
	})

	expect(result.data).toEqual(new ClientIdentificationNumberInUseError())
})

test("Should create client with assigned company", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const companiesRepository = new InMemoryCompaniesRepository()

	const makeLoadClientByCodeUseCase = () => {
		return new DbLoadClientByCode(clientsRepository)
	}

	const makeLoadClientByIdentificationNumberUseCase = () => {
		return new DbLoadClientByIdentificationNumber(clientsRepository)
	}

	const makeCreateClientUseCase = () => {
		const uuidAdapter = new UuidAdapter()
		return new DbCreateClientUseCase(
			uuidAdapter,
			makeLoadClientByCodeUseCase(),
			makeLoadClientByIdentificationNumberUseCase(),
			clientsRepository
		)
	}

	const makeCreateContactUseCase = () => {
		const uuidAdapter = new UuidAdapter()
		const contactsRepository = new InMemoryContactsRepository()
		return new DbCreateContact(uuidAdapter, contactsRepository)
	}

	const makeCreateCompanyUseCase = () => {
		const uuidAdapter = new UuidAdapter()
		return new DbCreateCompany(uuidAdapter, companiesRepository)
	}

	const createCompanyController = new CreateCompanyController(
		makeCreateCompanyValidation(),
		makeCreateContactValidation(),
		makeCreateContactUseCase(),
		makeCreateCompanyUseCase()
	)

	const createClientController = new CreateClientController(
		makeCreateClientUseCase(),
		makeCreateClientValidation(),
		makeCreateContactUseCase(),
		makeCreateContactValidation()
	)

	const company = await createCompanyController.execute({
		code: "CODE-1",
		name: "PTC",
		identificationNumber: "PTC_1",
	})

	if (company) {
		const result = await createClientController.execute({
			code: "CODE-CLIENT",
			identificationNumber: "1232",
			name: "Client Name",
			company: company.data,
		})

		expect(result.data?.code).toEqual("CODE-CLIENT")
		console.log(result) // TODO: remove it
	}
})
