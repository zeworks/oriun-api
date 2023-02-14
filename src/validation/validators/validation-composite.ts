import { Validation } from "@/presentation/protocols/validation"

export class ValidationComposite implements Validation {
	constructor(private readonly validations: Validation[]) {}

	// @ts-ignore
	// ignore the error on return
	validate(input: any): Error {
		for (const validation of this.validations) {
			const error = validation.validate(input)
			if (error) {
				return error
			}
		}
	}
}
