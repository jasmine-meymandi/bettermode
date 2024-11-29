import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import Login from "./components/login";
import { useAuth } from "./utils/auth-context";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Suspense fallback={<p>Loading...</p>}>
              <Login />
            </Suspense>
          )
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Suspense fallback={<p>Loading...</p>}>
              <PostList />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/post/:id"
        element={
          isAuthenticated ? (
            <Suspense fallback={<p>Loading...</p>}>
              <PostDetails />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
