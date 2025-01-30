import React, { useState } from "react";
import "../components/navbarStyling.css";
import { useNavigate } from "react-router-dom";
/* temporarely */
import lena from "../images/Lena.png"
import mariia from "../images/mariia.png"
import mine from "../images/Mine.png"
import image1 from "../images/cactus.png"
import image2 from "../images/icon-rice.png"
import image3 from "../images/sakura.png"
import whatsNext from "../images/seed.png"
import rulesIcon from "../images/medicine.png"
import fossil from "../images/fossil.png"


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
            <img src={image1} className="HPimage img1" />
            <img src={image2} className="HPimage img2" />
            <img src={image3} className="HPimage img3" />
          </div>
          <h2>Check out the blog posts</h2>
        </div>

        <div className="toNewBlogCard card">
          <h2>Create a new blog post</h2>
          <img src={whatsNext} alt="newBlogIcon" className="HPimage" />
        </div>

        <div className="toDiscover card">
          <img src={fossil} alt="toRulesImg" className="HPimage" />
          <h2>Discover something new in the world of plants</h2>
        </div>

        <div className="toRulesCard card">
          <h2>Read the rules</h2>
          <img src={rulesIcon} alt="toRulesImg" className="HPimage" />
        </div>

        <div className="toAboutUsCard card">
          <div className="toAboutUsImg">
            <img src={lena} className="HPimage img1" />
            <img src={mariia} className="HPimage img2" />
            <img src={mine} className="HPimage img3" />
          </div>
          <h2>Learn about the web developers</h2>
        </div>
      </div>
    </div>

  );
};

export default HomePage;