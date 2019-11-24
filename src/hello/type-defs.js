import { gql } from "apollo-server";

export default gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;
