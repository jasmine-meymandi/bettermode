import { useQuery, useMutation } from "@apollo/client/react/hooks";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { GET_POST_DETAILS, GetPostResponse, ADD_REACTION } from "../api";
import { getRelativeTime } from "../utils/helper";

export const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<GetPostResponse>(GET_POST_DETAILS, {
    variables: { id },
  });
  const [addReaction] = useMutation(ADD_REACTION);

  if (loading && typeof window === "undefined") {
    return <></>;
  }
  if (loading || !data) {
    return <p>Loading...</p>;
  }
  if (error) return <p>Error: {error.message}</p>;

  const { title, publishedAt, owner, fields, reactionsCount } = data.post;
  const content =
    fields
      .find((field) => field.key === "content")
      ?.value.replace(/^"|"$/g, "")
      .replace(/\\"/g, '"') || "";

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
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto p-9">
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center font-medium text-blue-500 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Posts
          </Link>
        </div>
        <div className="relative p-6 bg-white border rounded-lg shadow-md">
          {/* Profile Info */}
          <div className="flex items-center mb-4">
            <img
              src={owner.member.profilePicture.url || "/default-avatar.png"}
              alt={`${owner.member.name}'s profile`}
              className="w-10 h-10 mr-3 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                {owner.member.name || "Anonymous"}
              </h3>
              <p className="text-sm text-gray-500">
                {getRelativeTime(publishedAt)}
              </p>
            </div>
          </div>

          {/* Post Title */}
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            {title || "Untitled Post"}
          </h2>

          {/* Post Content */}
          <div className="prose-sm prose text-gray-600 max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </div>

          {/* Footer: Like Button */}
          <div className="flex items-center justify-between mt-6">
            <button
              title="button"
              onClick={() => id && handleLike(id)}
              className="flex items-center justify-center w-10 h-10 transition border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-red-500"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <p className="font-bold">
                {reactionsCount} {reactionsCount === 1 ? "like" : "likes"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
