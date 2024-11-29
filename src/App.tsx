import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import HomePage from "./components/HomePage";
import PostDetails from "./components/Post/PostDetails";
import Login from "./components/Auth/login";
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
              <HomePage />
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
