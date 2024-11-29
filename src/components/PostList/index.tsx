import type { Post, ServerResponse } from "../../api";
import PostItem from "./PostItem";

import { useQuery, useMutation } from "@apollo/client/react/hooks/";
import { GET_POSTS, ADD_REACTION, getPostsVariables } from "../../api";
import { useEffect } from "react";

export const PostList = (): React.ReactElement | null => {
  const {
    loading,
    error,
    data: postList,
    fetchMore,
    refetch,
  } = useQuery(GET_POSTS, {
    variables: {
      limit: 2,
      //TODO: remove hard code ids
      spaceIds: ["Q5xwe7mkn6Zr"],
      postTypeIds: ["8fn7djP3Bz2ZQ20"],
    },
  });
  useEffect(() => {
    // Trigger a refetch when the component mounts
    refetch();
  }, [refetch]);
  const [addReaction] = useMutation(ADD_REACTION);
  const handleLikeClick = async (postId: string) => {
    try {
      await addReaction({
        variables: {
          postId,
          input: {
            reaction: "heart", // Example reaction
            overrideSingleChoiceReactions: false,
          },
        },

        update: (cache) => {
          const data: ServerResponse | null = cache.readQuery({
            query: GET_POSTS,
            variables: getPostsVariables,
          });
          if (data) {
            const updatedData = {
              ...data,
              posts: {
                ...data.posts,
                nodes: data.posts.nodes.map((post: Post) => {
                  if (post.id === postId) {
                    return {
                      ...post,
                      reactionsCount: (post.reactionsCount || 0) + 1,
                    };
                  }
                  return post;
                }),
              },
            };

            cache.writeQuery({ query: GET_POSTS, data: updatedData });
          }
        },
      });
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  if (loading && typeof window === "undefined") {
    // Return an empty React fragment instead of null
    return <></>;
  }
  if (loading && !postList) {
    return <p>Loading...</p>; // Only show loading if no data is available
  }
  if (error) return <div>Error: {error.message}</div>;

  const handleShowMore = () => {
    if (postList.posts.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: postList.posts.pageInfo.endCursor,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return Object.assign({}, prevResult, {
            posts: Object.assign({}, fetchMoreResult.posts, {
              nodes: [
                ...prevResult.posts.nodes,
                ...fetchMoreResult.posts.nodes,
              ],
            }),
          });
        },
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container px-48 mx-auto py-9">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-900">
          Posts
        </h1>
        <div className="space-y-6">
          {postList?.posts?.nodes?.map((post: Post) => (
            <PostItem
              key={post.id}
              post={post}
              onLikeClick={() => handleLikeClick(post.id)}
            />
          ))}
        </div>
        {postList?.posts?.pageInfo?.hasNextPage && (
          <div className="mt-6 text-center">
            <button
              onClick={handleShowMore}
              className="z-50 px-6 py-3 text-white transition duration-200 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default PostList;
