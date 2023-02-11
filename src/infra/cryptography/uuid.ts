import { Uuid } from "@/data/protocols/cryptography/uuid"
import { v4 as uuid } from "uuid"

export class UuidAdapter implements Uuid {
	async generate(): Promise<string> {
		return uuid()
	}
}
