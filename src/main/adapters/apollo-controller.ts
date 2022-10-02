import { Controller } from "../protocols/controller";

export async function apolloControllerAdapter<Args = any, Context = any>(controller: Controller, args?: Args, context?: Context): Promise<any> {
  const request = {
    ...(args || {}),
  }

  const requestContext = {
    ...(context || {}),
    userId: (context as any)?.req?.userId
  }

  const httpResponse = await controller.execute(request, context);

  console.log({ httpResponse });
  
}
