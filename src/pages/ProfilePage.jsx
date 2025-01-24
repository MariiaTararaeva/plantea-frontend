/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null); // For storing user details
  const [posts, setPosts] = useState([]); // For storing user posts
  const [loading, setLoading] = useState(true); // For loading state

  // Fetch user and posts data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your API endpoint
        const userResponse = await fetch(`/api/users/${userId}`);
        const userData = await userResponse.json();

        const postsResponse = await fetch(`/api/users/${userId}/posts`);
        const postsData = await postsResponse.json();

        setUser(userData);
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <div className="error">User not found.</div>;
  }
  return (
    <>
      <div className="user-profile">
        <header className="user-header">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="user-avatar"
          />
          <h1>{user.username}</h1>
          <p>{user.bio || "No bio available."}</p>
        </header>

        <section className="user-stats">
          <div>
            <strong>{new Date(user.joinedDate).toLocaleDateString()}</strong>
            <span>Joined</span>
          </div>
        </section>

        <section className="user-posts">
          <h2>Posts by {user.username}</h2>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id} className="post-item">
                  <a href={`/post/${post.id}`}>
                    <h3>{post.title}</h3>
                    <p>{post.body.slice(0, 100)}...</p>
                  </a>
                  <span className="post-meta">
                    {post.upvotes} upvotes •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts yet.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
