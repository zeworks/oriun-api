export type HttpResponse<T = any> = {
	statusCode: number
	data: T
}

export interface HttpController<T = any, Context = any> {
	execute(request?: T, context?: Context): Promise<HttpResponse>
}
