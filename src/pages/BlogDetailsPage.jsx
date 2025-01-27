import { useParams } from "react-router-dom";
import { useFetchBlog } from "../hooks/useFetchBlog";
// import Comments from "../components/Comments";

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const { blogEntry, loading } = useFetchBlog(blogId);

  if (loading) return <p>Loading...</p>;

  if (!blogEntry) return <p>Blog not found.</p>;

  return (
    <div>
      <div className="uploaderInfo">
        {blogEntry.userId?.profilePicture && (
          <img
            src={blogEntry.userId.profilePicture}
            alt={`${blogEntry.userId.username} profile`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
      </div>
      <div className="blogContent">
        <h1>{blogEntry.title}</h1>
        <p>
          Created by {blogEntry.userId?.username || "Unknown"} at (ADD THE DATE)
        </p>
        {blogEntry.mediaContent?.length > 0 && (
          <div className="mediaContent">
            {blogEntry.mediaContent.map((url, index) => (
              <img key={index} src={url} alt={`Media ${index + 1}`} />
            ))}
          </div>
        )}
        <p>{blogEntry.textContent || "No description available."}</p>
      </div>
      <div className="commentSection">
        <h3>Comments</h3>
        {/* <Comments comments={blogEntry.comments} /> */}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
