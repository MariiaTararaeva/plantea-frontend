import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const handleAddBlogLocally = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

  //Changed
  const { token, user } = useContext(SessionContext);

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
    <div className="blog-container">
      <h1 className="h1">All Blogs</h1>
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog._id} className="blog-item">
            {/* Blog Thumbnail Image */}
            {blog?.selectedSpecies?.[0]?.default_image ? (
              <img
                src={blog.selectedSpecies[0].default_image}
                alt={blog.title}
              />
            ) : blog?.mediaContent?.[0]?.length > 0 ? (
              <img src={blog.mediaContent} alt={blog.title} />
            ) : (
              <img src={"https://placehold.co/80x80"} alt="Placeholder" />
            )}

            {/* Blog Title */}
            <h2 onClick={() => navigate(`/blogs/${blog._id}`)}>{blog.title}</h2>

            {/* Action Buttons */}
            <div className="blog-buttons">
              <button onClick={() => navigate(`/blogs/${blog._id}`)}>
                View Details
              </button>

              {user?._id === blog.userId._id && (
                <>
                  <button onClick={() => navigate(`/blogs/edit/${blog._id}`)}>
                    Edit Blog
                  </button>
                  <button onClick={() => handleDelete(blog._id)}>
                    Delete Blog
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBlogsPage;
