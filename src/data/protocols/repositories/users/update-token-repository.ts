import { UpdateAuthenticationTokenUseCase } from "@/domain/usecases/authentication/update-authentication-token"

export type UpdateTokenRepositoryFunction = (
	user_id: string,
	token: string
) => Promise<UpdateAuthenticationTokenUseCase.Result>

export interface UpdateTokenRepository {
	updateToken: UpdateTokenRepositoryFunction
}
