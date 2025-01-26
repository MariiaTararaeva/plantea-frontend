import { useState, useEffect } from "react";

const BlogForm = ({ blogData = null, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (blogData) {
      setFormData({
        title: blogData.title || "",
        content: blogData.textContent || "",
      });
    }
  }, [blogData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const buttonText = blogData ? "Update Blog" : "Create Blog";

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Content
        <textarea
          name="content"
          required
          value={formData.content}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default BlogForm;
