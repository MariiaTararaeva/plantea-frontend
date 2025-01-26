import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/navbarStyling.css";

const HomePage = () => {
  const [plants, setPlants] = useState([]); // Random plants for homepage
  const [searchResults, setSearchResults] = useState([]); // Results from search
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch 20 random plants from the database
  useEffect(() => {
    const fetchRandomPlants = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/plants/random?limit=20`); // Assuming this endpoint exists
        if (!response.ok) throw new Error("Failed to fetch plants");
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error("Error fetching random plants:", error);
      }
    };
    fetchRandomPlants();
  }, []);

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
                  <div key={plant._id} className="plant-card">
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

          {/* Display Random Plants */}
          <div className="random-plants">
            <h2>Explore Plants</h2>
            <div className="plant-grid">
              {plants.map((plant) => (
                <div key={plant._id} className="plant-card">
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
        </div>

  );
};

export default HomePage;
