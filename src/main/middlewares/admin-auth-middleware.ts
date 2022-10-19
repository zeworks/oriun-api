import { middlewareAdapter } from "../adapters/middleware-adapter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware-factory";

export const adminAuthMiddleware = middlewareAdapter(makeAuthMiddleware("ADMIN"));
