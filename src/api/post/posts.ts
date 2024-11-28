import { gql } from '@apollo/client/core';
import client from '../../utils/apolloClient';

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
          description
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

export const getPostsVariables = {
  limit: 2,
  spaceIds: ["Q5xwe7mkn6Zr"],
  postTypeIds: ["8fn7djP3Bz2ZQ20"],
};
