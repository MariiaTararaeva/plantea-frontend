import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import ProfileForm from "../components/ProfileForm";

const ProfilePage = () => {
  const { token } = useContext(SessionContext);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      //I NEED ERIC TO HELP ME WITH THIS
      if (!token) return; // If I remove this it will pop up an error twice ("Failed to fetch profile.") before successful fetch

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          alert("Failed to fetch profile.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSave = async (updatedData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfileData(updatedProfile);
        setIsEditing(false); // Exit edit mode
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profileData) return <p>Loading...</p>;

  return (
    <div>
      {!isEditing ? (
        <div>
          <h1>
            {profileData.firstName} {profileData.surname}
          </h1>
          <p>
            <strong>Username:</strong> {profileData.username}
          </p>
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          <p>
            <strong>Bio:</strong>{" "}
            {profileData.bioDescription || "No bio provided."}
          </p>
          <p>
            <strong>Greenhouse:</strong>{" "}
            {profileData.greenhouse.join(", ") || "None"}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        //USE this logic for editing the blog page (NewBlogPage.jsx)
        <ProfileForm
          data={profileData}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
