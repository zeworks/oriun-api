import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema"
import resolvers from "./resolvers"
import typeDefs from "./type-defs"
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core/dist/plugin";
import { GraphQLError } from "graphql";

const handleErrors = (response: any, errors?: readonly GraphQLError[]): void => {
  errors?.forEach(error => {
    response.data = undefined
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else {
      response.http.status = 500
    }
  })
}

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(name => name === errorName)
}

export async function createApolloServer() {
  /** generate schema based on typeDefs and resolvers */
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  /**
   * start apollo server
   * docs: https://www.apollographql.com/docs/apollo-server
   */
  const server = new ApolloServer({
    schema,
    cache: "bounded",
    introspection: process.env.NODE_ENV === "development",
    context: ({ req }) => ({ req }),
    formatError: (error) => ({
      message: error.message
    }),
    plugins: [
      process.env.NODE_ENV === "production" ? ApolloServerPluginLandingPageDisabled() : {},
      {
        requestDidStart: async () => ({
          willSendResponse: async ({ response, errors }) => handleErrors(response, errors)
        })
      }
    ]
  });

  const DEFAULT_PORT = process.env.NODE_ENV === "development" ? process.env.DEVELOPMENT_PORT : process.env.PRODUCTION_PORT;
  const serverObject = await server.listen(DEFAULT_PORT);
  
  return serverObject;
}
