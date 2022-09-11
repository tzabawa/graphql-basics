import { GraphQLServer } from "graphql-yoga";
import { Post, User } from "./types";

const demoPostsData: Post[] = [
  {
    author: "1",
    body: "Body 1",
    id: "1",
    published: true,
    title: "Title 1",
  },
  {
    author: "2",
    body: "Body 2",
    id: "2",
    published: true,
    title: "Title 2",
  },
];

const demoUsersData: User[] = [
  {
    age: 31,
    email: "tim@example.com",
    firstName: "Tim",
    id: "1",
    lastName: "Zabawa",
  },
  {
    email: "chris@example.com",
    firstName: "Chris",
    id: "2",
    lastName: "Zabawa",
  },
  {
    age: 33,
    email: "pat@example.com",
    firstName: "Pat",
    id: "3",
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
      posts: [Post!]!
      subtract(numbers: [Float!]!): Float
      users(query: String): [User!]!
    }

    type Post {
      author: User!
      body: String!
      id: ID!
      published: Boolean!
      title: String!
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
    greeting(parent: Record<any, any>, args: { name: string }): string {
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
    posts(): Post[] {
      return demoPostsData;
    },
    subtract(parent: Record<any, any>, args: { numbers: number[] }): number {
      return args.numbers.length
        ? args.numbers.reduce((agg, number) => {
            return (agg -= number);
          }, 0)
        : 0;
    },
    users(parent: Record<any, any>, args: { query: string }): User[] {
      return args.query
        ? demoUsersData.filter((demoUserData) =>
            `${demoUserData.firstName.toLowerCase()} ${demoUserData.lastName.toLowerCase()}`.includes(
              args.query.toLowerCase()
            )
          )
        : demoUsersData;
    },
  },
  Post: {
    author(parent: Record<any, any>) {
      return demoUsersData.find(
        (demoUserData) => demoUserData.id === parent.author
      );
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log("The server is up on port 4000!"));
