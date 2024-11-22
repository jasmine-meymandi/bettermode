import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import React from "react";
import { useParams, Link } from "react-router-dom";
export const GET_POST_DETAILS = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      createdAt
      thumbnail {
        ... on Image {
          url
        }
      }
      fields {
        key
        value
      }
    }
  }
`;

interface PostDetailsParams {
  id: string;
}

interface Field {
  key: string;
  value: string;
}

interface PostDetailsData {
  post: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    thumbnail?: {
      url: string;
    };
    fields: Field[];
  };
}

export const PostDetails: React.FC = () => {
  const { id } = useParams<any>(); // Get post ID from URL parameters
  const { loading, error, data } = useQuery<PostDetailsData>(GET_POST_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { title, description, createdAt, thumbnail, fields } = data!.post;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold text-center">{title}</h1>
      {thumbnail && (
        <img
          src={thumbnail.url}
          alt={title}
          className="w-full max-w-xl mx-auto mb-6 rounded-lg shadow-lg"
        />
      )}
      <p className="mb-4 text-lg text-gray-700">{description}</p>
      <p className="mb-4 text-sm text-gray-500">
        Created at: {new Date(createdAt).toLocaleString()}
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
