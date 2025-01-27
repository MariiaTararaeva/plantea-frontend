import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

const NewBlogPage = () => {
  const navigate = useNavigate();

  const { token } = useContext(SessionContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  // while user is typing the plant name in the tag field, e.e maple or dogwood etc. database has several different maple tree versions
  const handleTagChange = async (e) => {
    const query = e.target.value;
    setTags(query);

    // Fetch matching species (replace with API call if necessary)
    if (query.length > 2) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/plants?query=${query}`
        );
        if (response.ok) {
          const matches = await response.json();
          setSuggestions(matches);
        } else {
          console.log(response);
        }
      } catch {
        console.error("Error fetching species");
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSpecies = (species) => {
    setSelectedSpecies({
      plantId: species._id, // MongoDB ObjectId
      name: species.common_name, // Common name of the plant
      default_image: species.default_image,
    });
    setSuggestions([]);
  };

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
          body: JSON.stringify({
            title,
            author,
            textContent: content,
            tags,
            selectedSpecies: selectedSpecies
              ? { plantId: selectedSpecies.plantId, name: selectedSpecies.name }
              : null,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 201) {
        const responseBody = await response.json(); // Parse the response body as JSON
        console.log("Response body:", responseBody); // Log the response body        navigate("/blogs");
        navigate(`/blogs`);
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
        <label>
          Tags:
          <input
            type="text"
            value={tags}
            onChange={handleTagChange}
            placeholder="Enter tags"
          />
        </label>

        {suggestions.length > 0 && (
          <ul className="dropdown">
            {suggestions.map((species) => (
              <li
                key={species._id}
                onClick={() => handleSelectSpecies(species)}
                className="dropdown-item"
              >
                {species.default_image?.thumbnail ? (
                  <img
                    src={species.default_image.thumbnail}
                    alt={species.common_name || "Plant Image"}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                      backgroundColor: "#ccc",
                    }}
                  >
                    No Image
                  </div>
                )}
                {species.common_name}
              </li>
            ))}
          </ul>
        )}

        {selectedSpecies && (
          <div>
            <p>Selected Species: {selectedSpecies.name}</p>
            {selectedSpecies.default_image?.thumbnail ? (
              <img
                src={selectedSpecies.default_image.thumbnail}
                alt={selectedSpecies.common_name || "Selected Plant"}
              />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Image
              </div>
            )}
          </div>
        )}
        <label>
          Tags:
          <input
            type="text"
            value={tags}
            onChange={handleTagChange}
            placeholder="Enter tags"
          />
        </label>

        {suggestions.length > 0 && (
          <ul className="dropdown">
            {suggestions.map((species) => (
              <li
                key={species._id}
                onClick={() => handleSelectSpecies(species)}
                className="dropdown-item"
              >
                {species.default_image?.thumbnail ? (
                  <img
                    src={species.default_image.thumbnail}
                    alt={species.common_name || "Plant Image"}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                      backgroundColor: "#ccc",
                    }}
                  >
                    No Image
                  </div>
                )}
                {species.common_name}
              </li>
            ))}
          </ul>
        )}

        {selectedSpecies && (
          <div>
            <p>Selected Species: {selectedSpecies.name}</p>
            {selectedSpecies.default_image?.thumbnail ? (
              <img
                src={selectedSpecies.default_image.thumbnail}
                alt={selectedSpecies.common_name || "Selected Plant"}
              />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Image
              </div>
            )}
          </div>
        )}
        <button type="submit">Add blog</button>
      </form>
    </>
  );
};

export default NewBlogPage;

// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { SessionContext } from "../contexts/SessionContext";
// import BlogForm from "../components/BlogForm";

// const BlogPage = () => {
//   const { token } = useContext(SessionContext);
//   const { blogId } = useParams();
//   const navigate = useNavigate();
//   const [blogData, setBlogData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (blogId) {
//       const fetchBlog = async () => {
//         setLoading(true);
//         try {
//           const response = await fetch(
//             `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`
//           );
//           if (response.ok) {
//             const data = await response.json();
//             setBlogData(data);
//           } else {
//             console.error("Failed to fetch blog");
//           }
//         } catch (error) {
//           console.error("Error fetching blog:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchBlog();
//     }
//   }, [blogId]);

//   const handleSave = async (formData) => {
//     const url = blogId
//       ? `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`
//       : `${import.meta.env.VITE_API_URL}/api/blogs/new`;
//     const method = blogId ? "PUT" : "POST";

//     try {
//       setLoading(true);
//       const response = await fetch(url, {
//         method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         navigate("/blogs");
//       } else {
//         console.error("Failed to save blog", response);
//       }
//     } catch (error) {
//       console.error("Error saving blog:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{blogId ? "Edit Blog" : "Create New Blog"}</h1>
//       <BlogForm blogData={blogData} onSave={handleSave} />
//     </div>
//   );
// };

// export default BlogPage;
