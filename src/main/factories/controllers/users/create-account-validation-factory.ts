import { Validation } from "@/presentation/protocols/validation"
import { RequiredFieldValidation } from "@/validation/validators/required-field-validation"
import { ValidationComposite } from "@/validation/validators/validation-composite"

export const makeCreateAccountValidation = (): ValidationComposite => {
	const validations: Validation[] = []
	for (const field of ["username", "email"]) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
