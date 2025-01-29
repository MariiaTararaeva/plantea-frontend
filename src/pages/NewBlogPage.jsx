import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate, useParams } from "react-router-dom";

// import debounce from "lodash/debounce";

const NewBlogPage = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { token } = useContext(SessionContext);

  const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [other, setOther] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`
          );
          if (response.ok) {
            const data = await response.json();
            setBlogData(data);
          } else {
            console.error("Failed to fetch blog");
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
          setisUpdate(true);
        }
      };
      fetchBlog();
    }
  }, [blogId]);

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      // setAuthor(blogData.author);
      setContent(blogData.textContent);
      setTags(blogData.tags);
      setSelectedSpecies(blogData.selectedSpecies);
    }
  }, [blogData]);

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
          console.log(matches);
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
    const requestBody = {
      title,
      // author,
      textContent: content,
    };
    if (!isUpdate) {
      requestBody.tags = tags;
      requestBody.selectedSpecies = selectedSpecies
        ? { plantId: selectedSpecies.plantId, name: selectedSpecies.name, default_image: selectedSpecies.default_image.thumbnail}
        : null;
      requestBody.other = other;
      if(requestBody.other)
      {
        requestBody.mediaContent = imageUrl; // Add the uploaded image URL to the request body
      }

    }
    const url = `${import.meta.env.VITE_API_URL}${
      !isUpdate ? "/api/blogs/new" : `/api/blogs/${blogId}`
    }`;
    try {
      const response = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 201) {
        const responseBody = await response.json(); // Parse the response body as JSON
        console.log("Response body:", responseBody);
        setImageUrl("");// also other setters must be cleaned up!?

        navigate(`/blogs`);
      }
    } catch (error) {
      console.error(error);
    }
  };
    // ******** this method handles the file upload ********
    const uploadImage = async(file,url) => {

          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/new/upload`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: file,
          });
      return response
  
  };
    const handleFileUpload = (e) => {
      // console.log("The file to be uploaded is: ", e.target.files[0]);

      const uploadData = new FormData();

      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("imageUrl", e.target.files[0]);

      uploadImage(uploadData)
        .then(response => {
           console.log("response is: ", response);
          // response carries "fileUrl" which we can use to update the state

          return response.json()
          
         
          
        })
        .then(data => {
          console.log("data is: ", data);
           setImageUrl(data.fileUrl);})
        .catch(err => console.log("Error while uploading the file: ", err));
    };
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>{blogId ? "Edit Blog" : "Create New Blog"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        {/* <label>
          Author
          <input
            required
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label> */}
        <label>
          Content
          <textarea
            required
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        {!isUpdate && (
          <label>
            Search for a plant name:
            <input
              type="text"
              value={tags}
              onChange={handleTagChange}
              placeholder="Enter tags"
            />
          </label>
        )}
        {!isUpdate && (
          <label>
            Other (Enter your own plant name):
            <input
              type="text"
              value={other}
              onChange={(event) => setOther(event.target.value)
              }
              placeholder="Enter your own plant name"
            />
          </label>
        )}
        {/*file input if user has typed something into 'other' only */}
        {!isUpdate && other && other.length > 0 && (!tags || tags.length === 0) &&(
        <div>
          <label>Upload your file:</label>
          <input type="file" onChange={handleFileUpload} />
        </div>
      )}
        {suggestions.length > 0 && !isUpdate && (
          <ul className="dropdown">
            {suggestions.map((species) => (
              <li
                key={species._id}
                onClick={() => handleSelectSpecies(species)}
                className="dropdown-item"
              >
                {species.default_image?.thumbnail ? (
                  <img
                    loading="lazy"
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

        {selectedSpecies && !isUpdate && (
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
        <button type="submit">
          {isUpdate ? "Edit Blog" : "Create New Blog"}
        </button>
      </form>
    </>
  );
};

export default NewBlogPage;
