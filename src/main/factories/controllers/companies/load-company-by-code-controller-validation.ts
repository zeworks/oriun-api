import { Validation } from "@/presentation/protocols/validation"
import { RequiredFieldValidation } from "@/validation/validators/required-field-validation"
import { ValidationComposite } from "@/validation/validators/validation-composite"

export const makeLoadCompanyByCodeValidation = (): ValidationComposite => {
	const validations: Validation[] = []
	for (const field of ["code"]) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
