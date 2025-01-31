import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import icon from "../images/Potted-Plant-1.png";
//<hr> LINE
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
    <div className="comment">
      <h1 className="h1">Your Activity</h1>

      {userComments.length > 0 ? (
        userComments.map((comment) => (
          <div key={comment._id} className="commentCard" >
            {/*  The Blog Info  */}
            {comment.blogPostId && (
              <>
                {/*  Display the blog's author info (if available)  */}
                {comment.blogPostId.userId && (
                  <div className="blogAuthInfo">
                    <img className="blogAuthImg"
                      src={comment.blogPostId.userId.profilePicture || icon}
                      alt={comment.blogPostId.userId.username}
                    />
                    <br />
                    <strong>{comment.blogPostId.userId.username}</strong>
                  </div>
                )}
                <div>
                  <p>on{" "} {new Date(comment.blogPostId.createdAt).toLocaleString("es-ES")}</p>
                  <h2 className="blogTitleClickable"
                    key={comment.blogPostId._id}
                    onClick={() => navigate(`/blogs/${comment.blogPostId._id}`)}
                  >
                    {comment.blogPostId.title}
                  </h2>
                  <div className="blogContentComment">
                    {comment.blogPostId.mediaContent?.[0] ? (
                      <img
                        src={comment.blogPostId.mediaContent[0]}
                        alt="Blog main"
                      />
                    ) : (
                      <img
                        src={icon}
                        alt="Fallback"
                      />
                    )}

                    {/* Blog Post Text */}
                    <p>
                      {comment.blogPostId.textContent
                        ? comment.blogPostId.textContent.substring(0, 250)
                        : ""}
                      ...
                    </p>
                  </div>

                  {/*  Users Comment  */}
                  <hr />
                  <div className="commentGeneralDiv">
                    <div className="commentUserInfo">
                      {comment.userId && (
                        <>
                          <img className="commentAuthImg"
                            src={comment.userId.profilePicture || icon}
                            alt={comment.userId.username}
                          />
                          <br />
                          <span>{comment.userId.username}</span>
                        </>
                      )}
                    </div>
                    <div>
                      <p>on {new Date(comment.createdAt).toLocaleString("es-ES")}</p>

                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="about">You have not made any comments yet.</p>
      )}

      <button onClick={() => navigate("/blogs")}>See All Blogs</button>
    </div>
  );
};

export default MyCommentsPage;
