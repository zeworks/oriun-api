import { Encrypter } from "@/data/protocols/cryptography/encrypter"
import { Decrypter } from "@/data/protocols/cryptography/decrypter"
import { DEFAULT_JWT_EXPIRESIN } from "@/config/jwt"
import jwt from "jsonwebtoken"

export class JwtAdapter implements Encrypter, Decrypter {
	constructor(private readonly secret: string) {}

	async encrypt(plaintext: string): Promise<string> {
		return jwt.sign({ id: plaintext }, this.secret, {
			expiresIn: DEFAULT_JWT_EXPIRESIN,
		})
	}

	async decrypt(ciphertext: string): Promise<string> {
		return jwt.verify(ciphertext, this.secret) as any
	}
}
