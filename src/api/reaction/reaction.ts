import { gql } from '@apollo/client/core';
import client from '../../utils/apolloClient';
export const ADD_REACTION = gql`
  mutation AddReaction($postId: ID!, $input: AddReactionInput!) {
    addReaction(postId: $postId, input: $input) {
      status
    }
  }
`;
export const addReaction = (postId: string, reaction: string, overrideSingleChoiceReactions: boolean = false) =>
  client.mutate({
    mutation: ADD_REACTION,
    variables: {
      postId,
      input: {
        reaction,
        overrideSingleChoiceReactions,
      },
    },
  });