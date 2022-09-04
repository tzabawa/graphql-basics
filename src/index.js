import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
       age: Int!
       employed: Boolean!
       gpa: Float,
       id: ID!
       name: String!
    }
`;

const resolvers = {
  Query: {
    age() {
      return 31;
    },
    employed() {
      return true;
    },
    gpa() {
      return 3.72;
    },
    id() {
      return "ABC123";
    },
    name() {
      return "Tim Zabawa";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log("The server is up!"));
