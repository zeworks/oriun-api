import { UpdateAuthenticationTokenUseCase } from "@/domain/usecases/authentication/update-authentication-token"

export type UpdateTokenRepositoryFunction = (
	user_id: string,
	token?: string | null
) => Promise<UpdateAuthenticationTokenUseCase.Result>

export interface UpdateTokenRepository {
	updateToken: UpdateTokenRepositoryFunction
}
