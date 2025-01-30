import React, { useState } from "react";
import "../components/navbarStyling.css";
import { useNavigate } from "react-router-dom";
/* temporarely */
import image1 from "../images/Potted-Plant-1.png"
const HomePage = () => {

  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]); // Results from search
  const [searchQuery, setSearchQuery] = useState("");

  const handlePlantClick = (plantId) => {
    navigate(`/plants/${plantId}`);
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/plants/search?query=${searchQuery}`); // Assuming this endpoint exists
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (

    <div className="main-content">
      <h1>Welcome to the Plant Blog!</h1>
      <div className="searchDiv">
        <h2>Serch for a plant your interested in </h2>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for plants by name..."
          />
          <button type="submit">Search</button>
        </form>

        {/* Display Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <h2>Search Results:</h2>
            <div className="plant-grid">
              {searchResults.map((plant) => (
                <div key={plant._id} className="plant-card" onClick={() => handlePlantClick(plant._id)}>
                  <img
                    src={plant.default_image?.thumbnail || "/placeholder.jpg"}
                    alt={plant.common_name || "Plant"}
                    className="plant-image"
                  />
                  <p>{plant.common_name || plant.scientific_name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <h2>or</h2>
      <div className="homePageCards">
        <div className="toBlogsCard card">
          <div className="toblogsImg">
            <img src={image1} className="image img1" />
            <img src="image2.jpg" className="image img2" />
            <img src="image3.jpg" className="image img3" />
          </div>
          <h2>Check out the blog</h2>
        </div>
        <div className="toNewBlogCard card">
          <h2>Create a new blog post</h2>
          <img src="" alt="newBlogIcon" />
        </div>
        <div className="toRulesCard card">
          <img src="" alt="toRulesImg" />
          <h2>Read the rules</h2>
        </div>
        <div className="toAboutUsCard card">
          <h2>Learn about the web developers</h2>
          <div className="toAboutUsImg"></div>
        </div>
      </div>
    </div>

  );
};

export default HomePage;