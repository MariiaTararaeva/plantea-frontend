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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/plants/search?query=${searchQuery}`
      ); // Assuming this endpoint exists
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();
      navigate("/search-results", {
        state: { searchResults: data },
        state: { searchResults: data },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <nav className="[background-color:#b86943!important] [color:white!important] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1)!important] [position:fixed!important] [top:0!important] [left:0!important] [width:100%!important] [z-index:50!important]">
      <div className="flex justify-between items-center h-20 px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 w-1/4">
          <button onClick={() => navigate("/")} className="relative">
            <img src={icon} alt="Logo" className="h-8 w-auto" />
          </button>
        </div>

        {/* Links Section */}
        <div className="flex justify-start items-center w-auto">
          <ul className="[display:flex!important] [justify-content:flex-start!important] [align-items:center!important] [list-style:none!important]">
            <button onClick={() => navigate("/blogs")} className="relative">
              Blog posts
            </button>
            <button onClick={() => navigate("/blogs/new")} className="relative">
              New blog entry
            </button>
            <button onClick={() => navigate("/discover")} className="relative">
              Discover Plants
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
        <div className="[display:flex!important] [align-items:center!important] ">
          <form
            onSubmit={handleSearchSubmit}
            className="[display:flex!important] [align-items:center!important]  [background-color:transparent!important] [border:none!important] [padding:0!important]"
          >
            <div className="[!bg-transparent border-none p-0]">
              <input
                type="text"
                id="search-navbar"
                className="[display:block!important] [!position:relative!important] [margin-left:20px!important] [width:200px!important] [max-width:220px!important] [padding:0.5rem!important] [padding-left:2.5rem!important] [font-size:0.875rem!important] [color:#111827!important] [border:1px solid #d1d5db!important] [border-radius:0.5rem!important] [background-color:#f9fafb!important] focus:[outline:none!important] focus:[border-color:#3b82f6!important] focus:[ring:2px!important] focus:[ring-color:#3b82f6!important]"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {/* <button
                type="submit"
                className="[ml-auto] [position:absolute!important] [inset-y-0!important] [right-0!important] [padding:0.75rem!important] [background-color:#ea580c!important] [color:white!important] [border-radius:0.5rem!important] hover:[background-color:#c2410c!important]"
              >
                Search
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
