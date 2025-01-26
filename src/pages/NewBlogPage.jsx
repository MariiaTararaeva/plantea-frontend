import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import BlogForm from "../components/BlogForm";

const BlogPage = ({ blogData = null }) => {
  const navigate = useNavigate();
  const { blogId } = useParams(); // For editing a specific blog
  const { token } = useContext(SessionContext);
  console.log("TEST 1");
  const handleSave = async (formData) => {
    try {
      const url = blogData
        ? `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}` // Update existing blog
        : `${import.meta.env.VITE_API_URL}/api/blogs/new`; // Create new blog

      const method = blogData ? "PUT" : "POST"; // Determine the HTTP method

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          textContent: formData.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 201 || response.status === 200) {
        navigate("/blogs"); // Navigate back to the blog list
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{blogData ? "Edit Blog" : "Create New Blog"}</h1>
      <BlogForm blogData={blogData} onSave={handleSave} />
    </div>
  );
};

export default BlogPage;
