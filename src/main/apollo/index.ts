import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema"
import resolvers from "./resolvers"
import typeDefs from "./type-defs"
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core/dist/plugin";

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
    plugins: [
      process.env.NODE_ENV === "production" ? ApolloServerPluginLandingPageDisabled() : {}
    ]
  });

  const DEFAULT_PORT = process.env.NODE_ENV === "development" ? process.env.DEVELOPMENT_PORT : process.env.PRODUCTION_PORT;
  const serverObject = await server.listen(DEFAULT_PORT);
  
  return serverObject;
}
