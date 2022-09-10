import { GraphQLServer } from "graphql-yoga";

type User = {
  age?: number;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
};

const demoUsersData: User[] = [
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
    add(_: Record<any, any>, args: { numbers: number[] }): number {
      return args.numbers.length
        ? args.numbers.reduce((agg, number) => {
            return (agg += number);
          }, 0)
        : 0;
    },
    age(): number {
      return 31;
    },
    employed(): boolean {
      return true;
    },
    gpa(): number {
      return 3.72;
    },
    grades(): number[] {
      return [99, 80, 93];
    },
    greeting(_: Record<any, any>, args: { name: string }): string {
      return args.name ? `Hello ${args.name}!` : "Hello World!";
    },
    id(): string {
      return "ABC123";
    },
    me(): { firstName: string; id: string; lastName: string } {
      return { firstName: "Tim", id: "ABC123", lastName: "Zabawa" };
    },
    name(): string {
      return "Tim Zabawa";
    },
    subtract(_: Record<any, any>, args: { numbers: number[] }): number {
      return args.numbers.length
        ? args.numbers.reduce((agg, number) => {
            return (agg -= number);
          }, 0)
        : 0;
    },
    users(_: Record<any, any>, args: { query: string }): User[] {
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
