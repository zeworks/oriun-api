import { InternalServerError } from "../errors/internal-server-error"
import { UnauthorizedError } from "../errors/unauthorized-error"
import { HttpResponse, HttpStatusCode } from "../protocols/http"

export const ok = (data: any): HttpResponse => ({
	data,
	statusCode: HttpStatusCode.OK,
})

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: HttpStatusCode.BAD_REQUEST,
	data: error,
})

export const forbidden = (error: Error): HttpResponse => ({
	statusCode: HttpStatusCode.FORBIDDEN,
	data: error,
})

export const noContent = (): HttpResponse => ({
	statusCode: HttpStatusCode.NO_CONTENT,
	data: null,
})

export const serverError = (error: Error): HttpResponse => ({
	statusCode: HttpStatusCode.SERVER_ERROR,
	data: new InternalServerError(error.message, error.stack),
})

export const unauthorized = (): HttpResponse => ({
	statusCode: HttpStatusCode.UNAUTHORIZED,
	data: new UnauthorizedError(),
})
