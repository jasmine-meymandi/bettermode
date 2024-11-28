import { gql } from '@apollo/client/core';

export const GET_POST_DETAILS = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      publishedAt
      thumbnail {
        ... on Image {
          url
        }
      }
      fields {
        key
        value
      }
      owner{
        member{
          id
          name
        }
      }
      hasMoreContent
      reactionsCount
    }
  }
`;