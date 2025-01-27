import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import BlogForm from "../components/BlogForm";

const BlogPage = () => {
  const { token } = useContext(SessionContext);
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`
          );
          if (response.ok) {
            const data = await response.json();
            setBlogData(data);
          } else {
            console.error("Failed to fetch blog");
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [blogId]);

  const handleSave = async (formData) => {
    const url = blogId
      ? `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`
      : `${import.meta.env.VITE_API_URL}/api/blogs/new`;
    const method = blogId ? "PUT" : "POST";
    try {
      setLoading(true);
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/blogs");
      } else {
        console.error("Failed to save blog", response);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{blogId ? "Edit Blog" : "Create New Blog"}</h1>
      <BlogForm blogData={blogData} onSave={handleSave} />
    </div>
  );
};

export default BlogPage;
