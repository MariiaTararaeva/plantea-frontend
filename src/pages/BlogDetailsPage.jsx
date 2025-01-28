import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentEntry from "../components/CommentEntry";

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const [blogEntry, setBlogEntry] = useState(null);
  const [newCommentEntry, setNewCommentEntry] = useState("");
  const [comments, setComments] = useState([]);

  async function fetchBlogEntry(blogId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`
      );

      if (response.ok) {
        const blogEntryData = await response.json();
        setBlogEntry(blogEntryData);
        setComments(blogEntryData.comments);
      } else {
        console.log("Error obtaining the blog entry");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* function to add comments */

  async function handleAddComment(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            blogPostId: blogId,
            content: newCommentEntry,
          }),
        }
      );

      if (response.ok) {
        const addedComment = await response.json();

        setComments((prevComments) => [addedComment, ...prevComments]); //adding the last comment first I think

        setNewCommentEntry("");
      } else {
        console.log("Error adding the comment");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* function to delete a comment and not show it */

  function onDeleteComment(commentId) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment._id !== commentId);
    });
  }

  /* function to update a comment */
  function onUpdateComment(updatedComment) {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment
      )
    );
  }

  useEffect(() => {
    if (blogId) {
      fetchBlogEntry(blogId);
    }
  }, [blogId]);

  if (!blogEntry) {
    return <p> Loading...</p>;
  }

  return (
    <>
      <div className="uploaderInfo">
        <img
          src={blogEntry.userId.profilePicture}
          alt={`${blogEntry.userId.username} profile`}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </div>
      <div className="blogContent">
        <h1>{blogEntry.title} </h1>
        <p>
          created by {blogEntry.userId.username} -{" "}
          {new Date(blogEntry.createdAt).toLocaleString("es-ES")}
        </p>
        <div>Where we display the images in case there are</div>
        <p style={{ whiteSpace: "pre-line" }}>{blogEntry.textContent} </p>
      </div>
      <div className="commentSection">
        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <textarea
            value={newCommentEntry}
            onChange={(event) => setNewCommentEntry(event.target.value)}
            placeholder="Write your comment here..."
          />
          <button type="submit">Add Comment</button>
        </form>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentEntry
              key={comment._id}
              comment={comment}
              onDeleteComment={onDeleteComment}
              onUpdateComment={onUpdateComment}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}{" "}
      </div>
    </>
  );
};

export default BlogDetailsPage;
