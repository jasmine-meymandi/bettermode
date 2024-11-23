import { Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  );
};

export default App;
