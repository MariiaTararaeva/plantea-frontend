import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

const CommentEntry = ({ comment, onDeleteComment, onUpdateComment }) => {

    const { user } = useContext(SessionContext);

    /* states for  editing a comment */
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);


    async function handleDeleteComment(params) {
        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${comment._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })

            if (response.ok) {
                onDeleteComment(comment._id)
            } else {
                console.log("Error deleting comment")
            }
        } catch (error) {
            console.log(error);
        }
    }

    /* edit comment  function */
    async function handleEditComment() {
        try {
            const updatedData = {
                content: editedContent // Only snedding the edidted conntent
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${comment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedComment = await response.json();

                onUpdateComment(updatedComment);
                setIsEditing(false);
            } else {
                console.log("Error updating comment");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="comment">
            <div>
                <img src={comment.userId.profilePicture} alt={`${comment.userId.username} profile`} />
                <p><strong>{comment.userId.username}</strong> </p>
            </div>

            <div className="comment-content">
                <p>- {new Date(comment.createdAt).toLocaleString('es-ES')}</p>
                {isEditing ? (
                    <>
                        <textarea
                            value={editedContent}
                            onChange={(event) => setEditedContent(event.target.value)}
                        />
                        <button onClick={handleEditComment}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <p style={{ whiteSpace: "pre-line" }}>{comment.content}</p>
                )}

                {!isEditing && user?._id === comment.userId._id && (<>
                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                    <button type="button" onClick={handleDeleteComment} >
                        Delete comment
                    </button>
                </>
                )}
            </div>
        </div>
    );
};

export default CommentEntry;