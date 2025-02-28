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
          <li key={blog._id} className="blogCardLi">
            <div className="blogAuthor">
              <img src={blog.userId.profilePicture} alt="Author profile picture" />
              <p>{blog.userId.username} </p>
            </div>
            <div className="blogInfo">
              <p>on {new Date(blog.createdAt).toLocaleString("es-ES")} </p>
              <h2>{blog.title}</h2>
              <div className="blogImgAndContent">
                {/* if user selects a db image, take it as icon image, otherwise check uploaded images, if none display placeholder image */}
                {blog?.selectedSpecies?.[0]?.default_image ? (
                  <img
                    src={blog.selectedSpecies[0].default_image}
                    alt={"https://placehold.co/50x50"}
                  />
                ) : blog?.mediaContent?.[0]?.length > 0 ? (
                  <img
                    src={blog.mediaContent}
                    alt={"https://placehold.co/50x50"}
                  />
                ) : (
                  <img
                    src={"https://placehold.co/50x50"}
                    alt={"https://placehold.co/50x50"}
                  />
                )}
                <p>{blog.textContent.substring(0, 550)}... </p>
              </div>

              <div className="blogbuttons">
                <button onClick={() => navigate(`/blogs/${blog._id}`)}>
                  View Details
                </button>

                {/* THESE TWO BUTTONS changed*/}
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

            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBlogsPage;
