import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const MyCommentsPage = () => {
  const { token } = useContext(SessionContext);
  const [userComments, setUserComments] = useState([]);

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
      <h1>My Comments</h1>
      {userComments.length > 0 ? (
        userComments.map((comment) => (
          <div
            key={comment._id}
            style={{ border: "1px solid #ccc", margin: 8 }}
          >
            <h2>{comment.blogPostId?.title}</h2>

            {comment.blogPostId?.textContent && (
              <p>{comment.blogPostId.textContent.substring(0, 100)}...</p>
            )}
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>You have not made any comments yet.</p>
      )}
    </div>
  );
};

export default MyCommentsPage;
