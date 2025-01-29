import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import icon from "../images/Potted-Plant-1.png";

const MyCommentsPage = () => {
  const { token } = useContext(SessionContext);
  const [userComments, setUserComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyComments = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/mycomments`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          // `userData.comments` is the array of comment objects
          setUserComments(userData.comments || []);
        } else {
          console.error(
            "Failed to fetch my comments. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching my comments:", error);
      }
    };

    fetchMyComments();
  }, [token]);

  return (
    <div>
      <h1>Your Activity</h1>

      {userComments.length > 0 ? (
        userComments.map((comment) => (
          <div
            key={comment._id}
            style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}
          >
            {/*  The Blog Info  */}
            {comment.blogPostId && (
              <>
                {/*  Display the blog's author info (if available)  */}
                {comment.blogPostId.userId && (
                  <div style={{ margin: "1em 0" }}>
                    <strong>{comment.blogPostId.userId.username}</strong>
                    <br />
                    <img
                      src={comment.blogPostId.userId.profilePicture || icon}
                      alt={comment.blogPostId.userId.username}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  </div>
                )}

                <h2
                  key={comment.blogPostId._id}
                  style={{
                    cursor: "pointer",
                    color: "green",
                    margin: "0.5em",
                    height: "2em",
                  }}
                  onClick={() => navigate(`/blogs/${comment.blogPostId._id}`)}
                >
                  {comment.blogPostId.title}
                </h2>
                {comment.blogPostId.mediaContent?.[0] ? (
                  <img
                    src={comment.blogPostId.mediaContent[0]}
                    alt="Blog main"
                    style={{ width: 200, objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <img
                    src={icon}
                    alt="Fallback"
                    style={{ width: 200, objectFit: "cover", display: "block" }}
                  />
                )}

                {/* Blog Post Text */}
                <p>
                  {comment.blogPostId.textContent
                    ? comment.blogPostId.textContent.substring(0, 250)
                    : ""}
                  ...
                </p>
              </>
            )}

            {/*  Users Comment  */}
            <div style={{ marginTop: "1rem" }}>
              <strong></strong> {comment.content}
            </div>

            {/* Optional: to show the commenter’s user info
              ( the same as the logged-in user) */}
            {comment.userId && (
              <div style={{ marginTop: "0.5rem" }}>
                <span>{comment.userId.username}</span>
                <img
                  src={comment.userId.profilePicture || icon}
                  alt={comment.userId.username}
                  style={{
                    width: 30,
                    height: 30,
                    objectFit: "cover",
                    marginLeft: 8,
                  }}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>You have not made any comments yet.</p>
      )}

      <button onClick={() => navigate("/blogs")}>See All Blogs</button>
    </div>
  );
};

export default MyCommentsPage;
