const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <img src={comment.userId.profilePicture} alt={`${comment.userId.username} profile`} width="40px" />
            <div className="comment-content">
                <p><strong>{comment.userId.username}</strong> - {new Date(comment.createdAt).toLocaleDateString()}</p>
                <p>{comment.content}</p>
            </div>
        </div>
    );
};

export default Comment;