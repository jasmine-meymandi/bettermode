import { useQuery, useMutation } from "@apollo/client/react/hooks/";
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  GET_POST_DETAILS,
  GetPostResponse,
  GET_POSTS,
  ADD_REACTION,
  getPostsVariables,
} from "../api";
import type { Post, ServerResponse } from "../api";

export const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<GetPostResponse>(GET_POST_DETAILS, {
    variables: { id },
  });
  const [addReaction] = useMutation(ADD_REACTION);

  if (loading && typeof window === "undefined") {
    // Return an empty React fragment instead of null
    return <></>;
  }
  if (loading || !data) {
    return <p>Loading...</p>;
  }
  if (error) return <p>Error: {error.message}</p>;

  const { title, description, publishedAt, fields, reactionsCount } =
    data!.post;
  const handleLike = async (postId: string) => {
    try {
      await addReaction({
        variables: {
          postId,
          input: {
            reaction: "heart",
            overrideSingleChoiceReactions: false,
          },
        },

        update: (cache, { data: mutationData }) => {
          const existingData = cache.readQuery<GetPostResponse>({
            query: GET_POST_DETAILS,
            variables: { id },
          });

          if (existingData && mutationData) {
            const updatedData = {
              ...existingData,
              post: {
                ...existingData.post,
                reactionsCount: (existingData.post.reactionsCount || 0) + 1,
              },
            };

            cache.writeQuery({
              query: GET_POST_DETAILS,
              variables: { id },
              data: updatedData,
            });
          }
        },
      });
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };
  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold text-center">{title}</h1>

      <p className="mb-4 text-lg text-gray-700">{description}</p>
      <p className="mb-4 text-sm text-gray-500">
        Created at:
        {publishedAt ? new Date(publishedAt).toLocaleString() : "Unknown"}
      </p>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Additional Details:</h2>
        <ul className="pl-6 list-disc">
          {fields.map((field) => (
            <li key={field.key}>
              <strong>{field.key}:</strong> {field.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            if (id) handleLike(id);
          }}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Like ❤️ {reactionsCount || 0}
        </button>
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Back to Posts
        </Link>
      </div>
    </div>
  );
};
export default PostDetails;
