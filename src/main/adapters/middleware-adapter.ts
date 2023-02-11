import { Middleware } from "@/presentation/protocols/middleware"
import { NextFunction, Request, Response } from "express"

export const middlewareAdapter = (middleware: Middleware) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const request = {
			accessToken: req.headers?.["authorization"],
			...(req.headers || {}),
		}

		const httpResponse = await middleware.handle(request)

		if (httpResponse.statusCode === 200) {
			Object.assign(req, httpResponse.data)
			next()
		} else {
			res.status(httpResponse.statusCode).json({
				error: httpResponse.data.message,
			})
		}
	}
}
