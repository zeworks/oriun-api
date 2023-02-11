import { HttpResponse } from "@/presentation/protocols/http"

export interface Controller<
	ControllerRequest = any,
	ControllerResponse = any,
	ControllerContext = any
> {
	execute: ControllerProtocol<
		ControllerRequest,
		ControllerResponse,
		ControllerContext
	>
}

export type ControllerProtocol<
	ControllerRequest = any,
	ControllerResponse = any,
	ControllerContext = any
> = (
	request?: ControllerRequest,
	context?: ControllerContext
) => Promise<HttpResponse<ControllerResponse>>
