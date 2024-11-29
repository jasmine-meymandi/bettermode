export const mockGraphQLApi = async (query: string, variables: { email: string, password: string }) => {
  // Mock login response
  if (query.includes("login")) {
    const { email, password } = variables;
    if (email === "jasmine.meymandi@gmail.com" && password === "password123") {

      return { data: { login: { token: import.meta.env.VITE_GRAPHQL_AUTHORIZATION } } };
    } else {
      throw new Error("Invalid credentials");
    }
  }

  // Mock logout response
  if (query.includes("logout")) {
    return { data: { logout: { success: true } } };
  }

  return { data: {} };
};
export const logout = () => {
  localStorage.removeItem("authToken"); // Remove token
  window.location.href = "/login"; // Redirect to login page
};