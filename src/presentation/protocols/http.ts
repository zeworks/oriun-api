export type HttpResponse<T = any> = {
	statusCode: number
	data: T
}

export interface HttpController<T = any, Context = any> {
	execute(request?: T, context?: Context): Promise<HttpResponse>
}

export enum HttpStatusCode {
	OK = 200,
	BAD_REQUEST = 400,
	FORBIDDEN = 403,
	NO_CONTENT = 204,
	SERVER_ERROR = 500,
	UNAUTHORIZED = 401,
}
