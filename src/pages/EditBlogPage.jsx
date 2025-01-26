import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const EditBlog = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`
        );
        if (response.ok) {
          const data = await response.json();
          setBlogData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blogData) return <p>Loading...</p>;

  return <BlogForm blogData={blogData} />;
};

export default EditBlog;
