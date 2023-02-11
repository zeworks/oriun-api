import { InternalServerError } from "../errors/internal-server-error"
import { UnauthorizedError } from "../errors/unauthorized-error"
import { HttpResponse } from "../protocols/http"

export const ok = (data: any): HttpResponse => ({
	data,
	statusCode: 200,
})

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	data: error,
})

export const forbidden = (error: Error): HttpResponse => ({
	statusCode: 403,
	data: error,
})

export const noContent = (): HttpResponse => ({
	statusCode: 204,
	data: null,
})

export const serverError = (error: Error): HttpResponse => ({
	statusCode: 500,
	data: new InternalServerError(error.message, error.stack),
})

export const unauthorized = (): HttpResponse => ({
	statusCode: 401,
	data: new UnauthorizedError(),
})
