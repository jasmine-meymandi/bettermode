import type { Post, ServerResponse } from "../../api/post/type";
import PostItem from "./PostItem";

import { useQuery, useMutation } from "@apollo/client/react/hooks/";
import { GET_POSTS, ADD_REACTION, getPostsVariables } from "../../api";

export const PostList = (): React.ReactElement | null => {
  const {
    loading,
    error,
    data: postList,
    fetchMore,
  } = useQuery(GET_POSTS, {
    variables: {
      limit: 2,
      //TODO: remove hard code ids
      spaceIds: ["Q5xwe7mkn6Zr"],
      postTypeIds: ["8fn7djP3Bz2ZQ20"],
    },
  });

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
          console.log(data, cache);
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
    <div>
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-center">Posts</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
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
              className="px-6 py-2 text-white transition duration-200 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
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
