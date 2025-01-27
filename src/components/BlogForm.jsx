// import { useState, useEffect } from "react";

// const BlogForm = ({ blogData = null, onSave }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     textContent: "",
//   });

//   useEffect(() => {
//     if (blogData) {
//       setFormData({
//         title: blogData.title || "",
//         textContent: blogData.textContent || "",
//       });
//     }
//   }, [blogData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await onSave(formData); // Await the async onSave function
//     } catch (error) {
//       console.error("Error in handleSubmit:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Title
//         <input
//           name="title"
//           required
//           value={formData.title}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Content
//         <textarea
//           name="textContent"
//           required
//           value={formData.textContent}
//           onChange={handleInputChange}
//         />
//       </label>
//       <button type="submit">{blogData ? "Update Blog" : "Create Blog"}</button>
//     </form>
//   );
// };

// export default BlogForm;
