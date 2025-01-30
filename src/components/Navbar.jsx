import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { SessionContext } from "../contexts/SessionContext";
/* temporary import  for styling */
import "./navbarStyling.css";
import icon from "../images/Potted-Plant-1.png";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(SessionContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");



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
      navigate("/search-results", {
        state: {searchResults: data },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };


  return (

<nav className="bg-#b86943 text-white shadow-md fixed top-0 left-0 w-full z-50">
  <div className="flex justify-between items-center h-20 px-4">
    {/* Logo Section */}
    <div className="flex items-center space-x-2 w-1/4">
      <button onClick={() => navigate("/")} className="relative">
        <img src={icon} alt="Logo" className="h-8 w-auto" />
      </button>
    </div>

    {/* Links Section */}
    <div className="flex justify-start items-center w-auto">
      <ul className="flex space-x-6 items-center list-none font-mono text-lg text-black">
        <button onClick={() => navigate("/blogs")} className="relative">
          Blog posts
        </button>
        <button onClick={() => navigate("/blogs/new")} className="relative">
          New blog entry
        </button>
        <button onClick={() => navigate("/randomplants")} className="relative">
          Random Plants
        </button>
        <button onClick={() => navigate("/siterules")} className="relative">
          Rules
        </button>
        <button onClick={() => navigate("/aboutus")} className="relative">
          About
        </button>
      </ul>
    </div>

    {/* Search Bar Section */}
    <div className="flex items-center">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <div className="relative">
          <input
            type="text"
            id="search-navbar"
            className="block w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-3 bg-orange-600 text-white rounded-r-lg hover:bg-orange-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  </div>
</nav>

  );


};

export default Navbar;
