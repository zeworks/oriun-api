import { InMemoryClientsRepository } from "@/data/protocols/repositories/clients/in-memory-clients-repository"
import { InMemoryCompaniesRepository } from "@/data/protocols/repositories/companies/in-memory-companies-repository"
import { InMemoryContactsRepository } from "@/data/protocols/repositories/contacts/in-memory-contacts-repository"
import { UuidAdapter } from "@/infra/cryptography/uuid"
import { expect, test } from "vitest"
import { DbCreateCompany } from "../companies/db-create-company"
import { DbLoadCompanyByCode } from "../companies/db-load-company-by-code"
import { DbCreateContact } from "../contacts/db-create-contact"
import { DbCreateClient } from "./db-create-client-usecase"
import { DbLoadClientByCode } from "./db-load-client-by-code-usecase"
import { DbLoadClientByIdentificationNumber } from "./db-load-client-by-identificationNumber-usecase"

test("Should create client with company with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const uuidAdapter = new UuidAdapter()

	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const dbCreateClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)

	const result = await dbCreateClient.create({
		code: "000",
		identificationNumber: "12345",
		name: "Client name",
		status: true,
	})

	expect(result?.code).toEqual("000")
	expect(result?.identificationNumber).toEqual("12345")
	expect(result?.name).toEqual("Client name")
	expect(result?.status).toBeTruthy()

	// create company and assign it
	const companiesRepository = new InMemoryCompaniesRepository()
	const dbLoadCompanyByCode = new DbLoadCompanyByCode(companiesRepository)
	const dbCreateCompany = new DbCreateCompany(
		uuidAdapter,
		dbLoadCompanyByCode,
		companiesRepository
	)
	const company = await dbCreateCompany.create({
		code: "123",
		name: "Company name",
		status: true,
	})

	const resultWithCompany = await dbCreateClient.create({
		code: "0000",
		identificationNumber: "123456",
		name: "Client name",
		status: true,
		company,
	})

	expect(resultWithCompany?.code).toEqual("0000")
	expect(resultWithCompany?.identificationNumber).toEqual("123456")
	expect(resultWithCompany?.name).toEqual("Client name")
	expect(resultWithCompany?.status).toBeTruthy()
	expect(resultWithCompany?.company?.code).toEqual("123")
	expect(resultWithCompany?.company?.name).toEqual("Company name")
})

test("Should create client with two contacts with success", async () => {
	const clientsRepository = new InMemoryClientsRepository()
	const contactsRepository = new InMemoryContactsRepository()
	const uuidAdapter = new UuidAdapter()

	const dbLoadClientByCode = new DbLoadClientByCode(clientsRepository)
	const dbLoadClientByIdentificationNumber =
		new DbLoadClientByIdentificationNumber(clientsRepository)
	const dbCreateClient = new DbCreateClient(
		uuidAdapter,
		dbLoadClientByCode,
		dbLoadClientByIdentificationNumber,
		clientsRepository
	)
	const dbCreateContact = new DbCreateContact(uuidAdapter, contactsRepository)

	const firstContact = await dbCreateContact.create({
		country: "Portugal",
		default: true,
		name: "Contact Name 1",
		phone: "9122733732",
		prefix: "+351",
	})

	const secondContact = await dbCreateContact.create({
		country: "Portugal",
		default: true,
		name: "Contact Name 2",
		phone: "9122733733",
		prefix: "+351",
	})

	if (firstContact && secondContact) {
		const result = await dbCreateClient.create({
			code: "000",
			identificationNumber: "12345",
			name: "Client name",
			status: true,
			contacts: [firstContact, secondContact],
		})

		expect(result?.code).toEqual("000")
		expect(result?.identificationNumber).toEqual("12345")
		expect(result?.name).toEqual("Client name")
		expect(result?.status).toBeTruthy()
		expect(result?.contacts?.length).toEqual(2)
		expect(result?.contacts?.[1].name).toEqual("Contact Name 2")
	}
})
