export type Post = {
  author: string;
  body: string;
  id: string;
  published: boolean;
  title: string;
};

export type User = {
  age?: number;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
};
