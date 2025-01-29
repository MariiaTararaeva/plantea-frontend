import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import AnonymousRoute from "./components/AnonymousRoute";
import AllBlogsPage from "./pages/AllBlogsPage";
import NewBlogPage from "./pages/NewBlogPage";
import Sidebar from "./components/Sidebar";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import HomePage from "./pages/HomePage";
import PlantDetailsPage from "./pages/PlantDetailsPage";
import MyBlogsPage from "./pages/MyBlogPage";
import MyCommentsPage from "./pages/MyCommentsPage";
import AboutUsPage from "./pages/AboutPage";
import RandomPlantsPage from "./pages/RandomPlantsPage";
import RulesPage from "./pages/RulesPage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plants/:plantId" element={<PlantDetailsPage />} />

        <Route
          path="/signup"
          element={
            <AnonymousRoute>
              <SignupPage />
            </AnonymousRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AnonymousRoute>
              <LoginPage />
            </AnonymousRoute>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myblogs" element={<MyBlogsPage />} />
        <Route path="/mycomments" element={<MyCommentsPage />} />

        <Route
          path="/blogs/new"
          element={
            <PrivateRoute>
              <NewBlogPage />
            </PrivateRoute>
          }
        />

        <Route path="/blogs" element={<AllBlogsPage />} />

        <Route path="/blogs/:blogId" element={<BlogDetailsPage />} />
        <Route path="/blogs/edit/:blogId" element={<NewBlogPage />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route path="/randomplants" element={<RandomPlantsPage />} />
        <Route path="/siterules" element={<RulesPage />} />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
