import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();

        setUser(userData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">User not found.</div>;

  return (
    <div className="user-profile">
      <header className="user-header">
        <img
          src={user.avatar || ""}
          alt={`${user.username || "User"}'s avatar`}
          className="user-avatar"
        />
        <h1>{user.username || "Unknown User"}</h1>
        <p>{user.bio || "No bio available."}</p>
      </header>

      <section className="user-stats">
        <div>
          <strong>
            {user.joinedDate
              ? new Date(user.joinedDate).toLocaleDateString()
              : "N/A"}
          </strong>
          <span>Joined</span>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
