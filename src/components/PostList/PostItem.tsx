import { Link } from "react-router-dom";
import { Post } from "../../api/post/type";
import { getRelativeTime } from "../../utils/helper";
import { useState } from "react";

type Props = {
  post: Post;
  onLikeClick: (id: string) => void;
};

export const PostItem = ({ post, onLikeClick }: Props): React.ReactElement => {
  const content =
    post.fields
      .find((field) => field.key === "content")
      ?.value.replace(/^"|"$/g, "")
      .replace(/\\"/g, '"') || "";

  const [isExpanded, setIsExpanded] = useState(content.length < 200);

  const toggleContent = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent `Link` navigation when clicking "See More"
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="relative p-6 transition bg-white border rounded-lg shadow-md hover:shadow-lg">
      <Link to={`/post/${post.id}`} key={post.id}>
        {/* Profile Info */}
        <div className="flex items-center mb-4">
          <img
            src={post.owner.member.profilePicture.url || "/default-avatar.png"} // Replace with the actual profile picture URL
            alt={`${post.owner.member.name}'s profile`}
            className="w-10 h-10 mr-3 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800">
              {post.owner.member.name || "Anonymous"}
            </h3>
            <p className="text-sm text-gray-500">
              {getRelativeTime(post.publishedAt)}
            </p>
          </div>
        </div>

        {/* Post Title */}
        <h2 className="mb-4 overflow-hidden font-bold text-gray-800 text-ellipsis whitespace-nowrap">
          {post.fields
            .find((field) => field.key === "title")
            ?.value.replace(/^"|"$/g, "")
            .replace(/\\"/g, '"') || ""}
        </h2>
      </Link>

      {/* Post Content */}
      <div className="relative mb-4">
        <div
          className={`prose-sm prose text-gray-600 max-w-none overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-none" : "max-h-72"
          }`}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>

      {/* See More Button */}
      {content.length > 200 && (
        <button
          onClick={toggleContent}
          className="z-50 mt-4 font-medium text-blue-500 hover:text-blue-700"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}

      {/* Footer: Like Button and Count */}
      <div className="flex items-center justify-between mt-4">
        <button
          title="button"
          onClick={() => onLikeClick(post.id)}
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
        {post.reactionsCount > 0 && (
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
              {post.reactionsCount}
              {post.reactionsCount === 1 ? " like" : " likes"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
