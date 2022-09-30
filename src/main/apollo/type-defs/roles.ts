import { gql } from "apollo-server";

export default gql`
  type Query {
    helloWorld: HelloWorld
  }

  type HelloWorld {
    id: String!
  }
`;
