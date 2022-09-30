import express from "express";

const server = express();
server.listen(4000, () => {
  console.log(`🚀 Server is running on port ${4000}!`)
})
