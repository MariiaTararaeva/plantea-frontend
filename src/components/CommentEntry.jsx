import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const CommentEntry = ({ comment, onDeleteComment }) => {

    const { user } = useContext(SessionContext);

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



    return (
        <div className="comment">
            <img src={comment.userId.profilePicture} alt={`${comment.userId.username} profile`} width="40px" />
            <div className="comment-content">
                <p><strong>{comment.userId.username}</strong> - {new Date(comment.createdAt).toLocaleString('es-ES')}</p>
                <p style={{ whiteSpace: "pre-line" }}>{comment.content}</p>
                {user?._id === comment.userId._id && (
                    <button type="button" onClick={handleDeleteComment} >
                        Delete comment
                    </button>
                )}
            </div>
        </div>
    );
};

export default CommentEntry;