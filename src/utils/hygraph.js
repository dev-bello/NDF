import { GraphQLClient } from "graphql-request";

export const hygraph = new GraphQLClient(
  import.meta.env.VITE_HYGRAPH_API_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_API_TOKEN}`,
    },
  }
);

export const hygraphRW = new GraphQLClient(
  import.meta.env.VITE_HYGRAPH_API_RW_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_API_TOKEN}`,
    },
  }
);
