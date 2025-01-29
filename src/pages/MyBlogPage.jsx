import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const MyBlogsPage = () => {
  const { token } = useContext(SessionContext);
  const [userBlogs, setUserBlogs] = useState([]);

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
      <h1>My Blogs</h1>

      {userBlogs.blogs && userBlogs.blogs.length > 0 ? (
        userBlogs.blogs.map((blog) => (
          <div key={blog._id} style={{ border: "1px solid #ccc", margin: 8 }}>
            <h2>{blog.title}</h2>
            <p>{blog.textContent}</p>
            {/* Possibly blog tags, etc. */}
          </div>
        ))
      ) : (
        <p>You did not create any content yet.</p>
      )}
      <p>Would you like to create a new post?</p>
      <button>New Blog</button>
    </div>
  );
};

export default MyBlogsPage;
