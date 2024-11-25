// import { useState } from "react";
// import pkg from "@apollo/client";
// import { Link } from "react-router-dom";
// const { gql, useQuery, useMutation } = pkg;
// // Mutation to add a reaction (like)
// const ADD_REACTION = gql`
//   mutation AddReaction($postId: ID!, $input: AddReactionInput!) {
//     addReaction(postId: $postId, input: $input) {
//       status
//     }
//   }
// `;
// const GET_POSTS = gql`
//   query GetPosts(
//     $limit: Int!
//     $spaceIds: [ID!]
//     $postTypeIds: [String!]
//     $after: String
//   ) {
//     posts(
//       limit: $limit
//       spaceIds: $spaceIds
//       postTypeIds: $postTypeIds
//       after: $after
//     ) {
//       nodes {
//         id
//         title
//         description
//         createdAt
//         reactionsCount
//         thumbnail {
//           ... on Image {
//             url
//           }
//           ... on File {
//             url
//           }
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//     }
//   }
// `;

// export function PostList() {
//   const [posts, setPosts] = useState<any[]>([]);
//   const { loading, error, data, fetchMore, refetch } = useQuery(GET_POSTS, {
//     variables: {
//       limit: 6, // Number of posts to fetch per page
//       spaceIds: ["Q5xwe7mkn6Zr"], // Replace with your actual Space ID
//       postTypeIds: ["8fn7djP3Bz2ZQ20"], // Replace with your actual Post Type ID
//     },
//     onCompleted: (data: any) => {
//       setPosts(data.posts?.nodes || []); // Initialize the posts state
//     },
//   });
//   const [addReaction] = useMutation(ADD_REACTION);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   const handleLike = async (postId: string) => {
//     try {
//       await addReaction({
//         variables: {
//           postId,
//           input: {
//             reaction: "heart",
//             overrideSingleChoiceReactions: false,
//           },
//         },
//       });
//       refetch(); // Refresh the post data to get updated like count
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="mb-6 text-2xl font-bold text-center">Posts</h1>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//         {data?.posts?.nodes?.map((post: any) => (
//           <div className="p-6" key={post.id}>
//             <Link
//               to={`/post/${post.id}`}
//               className="p-4 transition border rounded shadow hover:shadow-md"
//             >
//               <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg">
//                 <h2 className="mb-2 text-lg font-semibold text-center">
//                   {post.title || "Untitled Post"}
//                 </h2>
//                 <p className="text-sm text-center text-gray-600">
//                   {post.description || "No description available"}
//                 </p>
//                 <p className="text-sm text-center text-gray-600">
//                   {post.reactionsCount || 0} Reactions
//                 </p>
//               </div>
//             </Link>
//             <div className="flex items-center justify-between mt-4">
//               <button
//                 onClick={() => handleLike(post.id)}
//                 className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//               >
//                 ❤️ Like
//               </button>
//               <p className="text-sm text-gray-700">
//                 {post.likesCount || 0} likes
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {data.posts.pageInfo.hasNextPage && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={() =>
//               fetchMore({
//                 variables: { after: data.posts.pageInfo.endCursor },
//               })
//             }
//             className="px-6 py-2 text-white transition duration-200 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
//           >
//             Show More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
// export default PostList;
