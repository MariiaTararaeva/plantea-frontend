import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetailsPage = () => {

    //Fetch the blog
    const { blogId } = useParams()
    const [blogEntry, setBlogEntry] = useState(null);

    async function fetchBlogEntry(blogId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`)

            if (response.ok) {
                const blogEntryData = await response.json();
                setBlogEntry(blogEntryData)
            } else {
                console.log("Error obtaining the blog entry")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (blogId) {
            fetchBlogEntry(blogId)
        }
    }, [blogId])

    if (!blogEntry) {
        return (<p> Loading...</p>)
    }


    return (<>
        <div className="uploaderInfo">
            <img
                src={blogEntry.userId.profilePicture}
                alt={`${blogEntry.userId.username} profile`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
        </div>
        <div className="blogContent">
            <h1>{blogEntry.title} </h1>
            <p>created by {blogEntry.userId.username} at (ADD THE DATE)</p>
            <div>
                Where we display the images in case there are
            </div>
            <p>a paragraph for the descriptions</p>
        </div>
        <div className="commentSection">
            <h3>Comments</h3>
            {blogEntry.comments.length > 0 ? (
                blogEntry.comments.map(comment => <Comment key={comment._id} comment={comment} />)
            ) : (
                <p>No comments yet.</p>
            )} </div>
    </>);
}

export default BlogDetailsPage;