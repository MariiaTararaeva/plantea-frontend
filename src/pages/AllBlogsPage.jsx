import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(SessionContext);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs`
        );
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <h1>All Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h2>{blog.title}</h2>
            <button onClick={() => navigate(`/blogs/${blog._id}`)}>
              View Details
            </button>
            <button onClick={() => navigate(`/blog/edit/${blog._id}`)}>
              Edit Blog
            </button>
            <button onClick={() => handleDelete(blog._id)}>Delete Blog</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBlogsPage;
