// import pkg from '@apollo/client';

import { gql } from '@apollo/client/core';
import client from '../../utils/apolloClient';
// const { gql } = pkg;
export const GET_POSTS = gql`
 query GetPosts(
    $limit: Int!
    $spaceIds: [ID!]
    $postTypeIds: [String!]
    $after: String
  ) {
    posts(
      limit: $limit
      spaceIds: $spaceIds
      postTypeIds: $postTypeIds
      after: $after
    ) {
      nodes {
          id
          slug
          title
          fields{
            key,
            value
          }
          createdAt
          publishedAt
          hasMoreContent
          reactionsCount
          isAnonymous
          status
          primaryReactionType
          lastActivityAt
          url
          owner {
            member{
              id
              email
              name
              profilePicture {
                __typename
                ... on Image {
                  url
               }
              }
            }
          }
       }  
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const getPosts = () =>
  client.query({
    query: GET_POSTS,
    // TODO: Fix hard code ids
    variables: {
      limit: 2,
      spaceIds: ["Q5xwe7mkn6Zr"],
      postTypeIds: ["8fn7djP3Bz2ZQ20"],
    },
    fetchPolicy: 'no-cache',
  });
