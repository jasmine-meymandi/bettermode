import { Routes, Route } from "react-router-dom";
import PostList from "./components/PostList/index";
import PostDetails from "./components/PostDetails";
import { Suspense } from "react";
const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <PostList />
          </Suspense>
        }
      />
      <Route
        path="/post/:id"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <PostDetails />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
