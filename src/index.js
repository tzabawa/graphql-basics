import { GraphQLServer } from "graphql-yoga";

const demoUsersData = [
  {
    age: 31,
    email: "tim@example.com",
    firstName: "Tim",
    id: 1,
    lastName: "Zabawa",
  },
  {
    email: "chris@example.com",
    firstName: "Chris",
    id: 2,
    lastName: "Zabawa",
  },
  {
    age: 33,
    email: "pat@example.com",
    firstName: "Pat",
    id: 3,
    lastName: "Zabawa",
  },
];

const typeDefs = `
    type Query {
      add(numbers: [Float!]!): Float
      age: Int!
      employed: Boolean!
      gpa: Float,
      grades: [Int]!
      greeting(name: String): String!
      id: ID!
      me: User!
      name: String!
      subtract(numbers: [Float!]!): Float
      users(query: String): [User!]!
    }

    type User {
        age: Int
        email: String!
        firstName: String!
        id: ID!
        lastName: String!
    }
`;

const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      return args.numbers.length
        ? args.numbers.reduce((agg, number) => {
            return (agg += number);
          }, 0)
        : 0;
    },
    age() {
      return 31;
    },
    employed() {
      return true;
    },
    gpa() {
      return 3.72;
    },
    grades(parent, args, ctx, info) {
      return [99, 80, 93];
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
    subtract(parent, args, ctx, info) {
      return args.numbers.length
        ? args.numbers.reduce((agg, number) => {
            return (agg -= number);
          }, 0)
        : 0;
    },
    users(parent, args, ctx, info) {
      return args.query
        ? demoUsersData.filter((demoUserData) =>
            `${demoUserData.firstName.toLowerCase()} ${demoUserData.lastName.toLowerCase()}`.includes(
              args.query.toLowerCase()
            )
          )
        : demoUsersData;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log("The server is up!"));
