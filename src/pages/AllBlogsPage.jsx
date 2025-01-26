import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const AllBlogsPage = () => {
  const { token } = useContext(SessionContext);

  const [blogs, setblogs] = useState([]);
  const navigate = useNavigate();
  const fetchAllblogs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
      if (response.ok) {
        const blogsData = await response.json();
        setblogs(blogsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllblogs();
  }, []);

  const handleDelete = async (currentblogId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${currentblogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        fetchAllblogs();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleUpdate = async (currentblogId) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/blogs/${currentblogId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.status === 204) {
  //       fetchAllblogs();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <h1>All blogs</h1>
      <ul>
        {blogs.map((currentblog) => (
          <li key={currentblog._id}>
            <p>{currentblog.title}</p>
            <button type="button" onClick={() => handleDelete(currentblog._id)}>
              Delete
            </button>

            <button
              type="button"
              onClick={() => navigate(`/blog/edit/${currentblog._id}`)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllBlogsPage;
