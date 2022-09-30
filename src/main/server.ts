import dotenv from "dotenv"
dotenv.config();
import express from "express";

const server = express();

const DEFAULT_PORT = process.env.NODE_ENV === "development" ? process.env.DEVELOPMENT_PORT : process.env.PRODUCTION_PORT

server.listen(DEFAULT_PORT, () => {
  console.log(`🚀 Server is running on port ${DEFAULT_PORT}!`)
})
