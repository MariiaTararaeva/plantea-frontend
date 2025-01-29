import React, { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isAuthenticated, user, logout, isLoading } =
    useContext(SessionContext);
  if (isLoading) {
    return <p>Loading user...</p>;
  }

  return isAuthenticated && user ? (
    <div className="user-info">
      <img src={user.profileImage} alt="Profile" />
      <h3>{user.username}</h3>
      <p>
        {user.name} {user.surname}
      </p>
      <nav>
        <ul>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
          <li>
            <Link to="/myblogs">My Posts</Link>
          </li>
          <li>
            <Link to="/mycomments">My comments</Link>
          </li>
          <li>
            <Link to="/profile/settings">Account settings</Link>
          </li>
        </ul>
      </nav>
      <button onClick={logout}>Log out</button>
    </div>
  ) : (
    <div>
      <p>Welcome User!</p>
      <p>It seems you are not logged in</p>
      <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Sidebar;
