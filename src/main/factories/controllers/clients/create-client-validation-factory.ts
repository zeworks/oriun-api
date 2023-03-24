import { Validation } from "@/presentation/protocols/validation"
import { RequiredFieldValidation } from "@/validation/validators/required-field-validation"
import { ValidationComposite } from "@/validation/validators/validation-composite"

export const makeCreateClientValidation = () => {
	const validations: Validation[] = []
	for (const field of ["name", "code", "identificationNumber"]) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
