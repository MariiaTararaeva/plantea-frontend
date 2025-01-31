import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import icon from "../images/Potted-Plant-1.png";

const MyBlogsPage = () => {
  const { token } = useContext(SessionContext);
  const [userBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/myblogs`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();

          setUserBlogs(data);
        } else {
          console.error("Failed to fetch my blogs. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching my blogs:", error);
      }
    };

    fetchMyBlogs();
  }, [token]);
  return (
    <div>
      <h1 className="h1">My Blogs</h1>

      {userBlogs.blogs && userBlogs.blogs.length > 0 ? (
        userBlogs.blogs.map((blog) => (
          <div key={blog._id} className="myBlogsEntry" >
            {blog.userId && (
              <div >
                <img className="blogAuthImg"
                  src={blog.userId.profilePicture}
                  alt={blog.userId.username}
                />
                <p><strong> {blog.userId.username}</strong></p>
              </div>
            )}
            <div className="myBlogsEntryContent">
              <h2 onClick={() => navigate(`/blogs/${blog._id}`)}>
                {" "}
                {blog.title}
              </h2>
              <p>{blog.textContent.substring(0, 250)}...</p>
              <img src={blog.mediaContent?.[0] || icon} alt="Blog" />
            </div>

          </div>
        ))
      ) : (
        <p>You did not create any content yet.</p>
      )}
      <p>Would you like to create a new post?</p>
      <button onClick={() => navigate("/blogs/new")}>New Post</button>
    </div>
  );
};

export default MyBlogsPage;
