import { HttpResponse } from "@/presentation/protocols/http";

export interface Controller<ControllerRequest = any, ControllerResponse = any, ControllerContext = any> {
  execute: (request?: ControllerRequest, context?: ControllerContext) => Promise<HttpResponse<ControllerResponse>>
}
