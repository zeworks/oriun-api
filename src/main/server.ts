import "module-alias/register"
import dotenv from "dotenv"
dotenv.config()

import { createApolloServer } from "./apollo/create-apollo-server"

createApolloServer().then(({ url }) =>
	console.log(`🚀 Server listening on: ${url}`)
)
