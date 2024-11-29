export const mockGraphQLApi = async (query: string, variables?: { email: string, password: string }) => {
  // Mock login response
  if (query.includes("login")) {
    if (variables?.email === "jasmine.meymandi@gmail.com" && variables?.password === "password123") {

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
