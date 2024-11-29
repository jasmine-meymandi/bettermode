import { useAuth } from "../utils/auth-context";
import LogoutButton from "./Auth/logout";
import PostList from "./Post/PostList";

export const HomePage = (): React.ReactElement | null => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen bg-gray-200">
      {isAuthenticated && (
        <div className="absolute z-50 top-4 right-4">
          <LogoutButton />
        </div>
      )}
      <PostList />
    </div>
  );
};
export default HomePage;
