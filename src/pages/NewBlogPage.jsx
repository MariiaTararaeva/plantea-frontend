import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const NewBlogPage = () => {
  const navigate = useNavigate();

  const { token } = useContext(SessionContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, author, textContent: content }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 201) {
        navigate("/blogs");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>New blog</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Author
          <input
            required
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
        <label>
          Content
          <textarea
            required
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <button type="submit">Add blog</button>
      </form>
    </>
  );
};

export default NewBlogPage;
