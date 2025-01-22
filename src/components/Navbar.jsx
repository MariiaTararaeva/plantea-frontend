import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
/* temporary import  for styling */
import "./navbarStyling.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(SessionContext);

  return (
    <nav style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "15px" }}>
      <img src="src/images/webicon.png" alt="Web Icon" style={{ height: "50px" }} />
      <ul style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", gap: "10px", listStyle: "none" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="dropdown">
          <Link to="/blogs">Blogs entries ▼</Link>
          <ul className="dropdown-menu">
            <li><Link to="/blogs">Check out the blog posts</Link></li>
            <li><Link to="/blogs/new">Write a new blog entry</Link></li>
          </ul>
        </li>
        <li className="dropdown">
          <Link to="/questions">Questions ▼</Link>
          <ul className="dropdown-menu">
            <li><Link to="/questions">Check out the comunity concerns</Link></li>
            <li><Link to="/questions/new">Write a new question entry</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/randomplant">Random Plant</Link>
        </li>
        <li>
          <Link to="/rules">Rules</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        ) : (
          null
        )}
      </ul>
      {isAuthenticated ? (

        <button type="button" onClick={logout}>
          Logout
        </button>

      ) : (
        <ul style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", gap: "10px", listStyle: "none" }}>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
