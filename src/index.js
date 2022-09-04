import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
       age: Int!
       employed: Boolean!
       gpa: Float,
       greeting(name: String): String!
       id: ID!
       me: User!
       name: String!
    }

    type User {
        firstName: String!
        id: ID!
        lastName: String!
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
    greeting(parent, args, ctx, info) {
      return args.name ? `Hello ${args.name}!` : "Hello World!";
    },
    id() {
      return "ABC123";
    },
    me() {
      return { firstName: "Tim", id: "ABC123", lastName: "Zabawa" };
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
