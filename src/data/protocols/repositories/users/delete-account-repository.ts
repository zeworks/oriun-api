import { DeleteAccountUseCaseFn } from "@/domain/usecases/users/delete-account"

export interface DeleteAccountRepository {
	deleteAccount: DeleteAccountUseCaseFn
}
