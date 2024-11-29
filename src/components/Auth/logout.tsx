import { mockGraphQLApi } from "../../api";
import { useAuth } from "../../utils/auth-context";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await mockGraphQLApi(
      `
      mutation Logout {
        logout {
          success
        }
      }
    `
    );
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-500 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
