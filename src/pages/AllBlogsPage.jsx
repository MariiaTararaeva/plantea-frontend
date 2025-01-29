import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  //Changed
  const { token, user } = useContext(SessionContext);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs`
        );
        if (response.ok) {
          const data = await response.json();
          setBlogs(data)
          console.log(data)
        //   data.map((blog) => {
        //     fetchImages(blog);
        //  });
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlogs();

  }, []);
   
  // useEffect(() => {
  //   blogs.map((blog) => {
  //      fetchImages(blog);
  //   });
  // },[blogs])
 

  const fetchImages = async(blog)=> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${blog._id}`
      );
      const data = await response.json();
      console.log(data)
      if(data[0]?.default_image?.thumbnail){
        blog.mediaContent.push(data[0].default_image.thumbnail)
      }
      else{
        blog.mediaContent.push("https://placehold.co/50x50")
      }
    } catch (error) {
      console.error("Failed to fetch image") ;
    }

  }
  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
 

  return (
    <div>
      <h1>All Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h2>{blog.title}</h2>
            {blog?.selectedSpecies?.[0]?.default_image ? 
              <img
              src={blog.selectedSpecies[0].default_image}
              alt={"https://placehold.co/50x50"}
              style={{ width: "50px", marginRight: "10px" }}
            /> 
            :              <img
            src={"https://placehold.co/50x50"}
            alt={"https://placehold.co/50x50"}
            style={{ width: "50px", marginRight: "10px" }}
          /> }

              <button onClick={() => navigate(`/blogs/${blog._id}`)}>
              View Details
            </button>

            {/* THESE TWO BUTTONS changed*/}
            {user?._id === blog.userId._id && (
              <>
                <button onClick={() => navigate(`/blogs/edit/${blog._id}`)}>
                  Edit Blog
                </button>
                <button onClick={() => handleDelete(blog._id)}>
                  Delete Blog
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBlogsPage;

