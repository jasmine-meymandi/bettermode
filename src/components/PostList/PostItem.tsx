import { Link } from "react-router-dom";
import { Post } from "../../api/post/type";

type Props = {
  post: Post;
  onLikeClick: (id: string) => void;
};

export const PostItem = ({ post, onLikeClick }: Props): React.ReactElement => {
  return (
    <div className="p-6">
      <Link
        to={`/post/${post.id}`}
        className="p-4 transition border rounded shadow hover:shadow-md"
      >
        <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg">
          <h2 className="mb-2 text-lg font-semibold text-center">
            {post.title || "Untitled Post"}
          </h2>
          <p className="text-sm text-center text-gray-600">
            {post.description || "No description available"}
          </p>
          <p className="text-sm text-center text-gray-600">
            {post.reactionsCount || 0} Reactions
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => onLikeClick(post.id)}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          ❤️ Like
        </button>
        <p className="text-sm text-gray-700">{post.repliesCount || 0} likes</p>
      </div>
    </div>
  );
};
export default PostItem;
