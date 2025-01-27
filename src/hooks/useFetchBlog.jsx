import { useState, useEffect } from "react";

export const useFetchBlog = (blogId) => {
  const [blogEntry, setBlogEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`
        );
        if (response.ok) {
          const data = await response.json();
          setBlogEntry(data);
        } else {
          console.error("Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  return { blogEntry, loading };
};
