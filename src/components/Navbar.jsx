import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
/* temporary import  for styling */
import "./navbarStyling.css";
import icon from "../images/Potted-Plant-1.png"


const Navbar = () => {
  const { isAuthenticated, logout } = useContext(SessionContext);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "5px",
      }}
    >
      <img
        src={icon}
        alt="Web Icon"
        style={{ height: "50px" }}
      />
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          listStyle: "none",
        }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="dropdown">
          <Link to="/blogs">Blogs entries ▼</Link>
          <ul className="dropdown-menu" style={{ listStyle: "none" }}>
            <li>
              <Link to="/blogs">Check out the blog posts</Link>
            </li>
            <li>
              <Link to="/blogs/new">Write a new blog entry</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/randomplants">Random Plants</Link>
        </li>
        <li>
          <Link to="/siterules">Rules</Link>
        </li>
        <li>
          <Link to="/aboutUs">About</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        ) : null}
      </ul>
      {isAuthenticated ? (
        <button type="button" onClick={logout}>
          Logout
        </button>
      ) : (
        <ul
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            listStyle: "none",
          }}
        >
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
