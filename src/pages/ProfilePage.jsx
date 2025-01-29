import { useState, useEffect, useContext, useCallback } from "react";
import { SessionContext } from "../contexts/SessionContext";
import ProfileForm from "../components/ProfileForm";

const ProfilePage = () => {
  const { token } = useContext(SessionContext);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // const [profilePicture, setProfilePicture] = useState(null); // Stores uploaded image URL
  const [uploading, setUploading] = useState(false);
  const [hover, setHover] = useState(false); // Track hover state

  const fetchProfile = useCallback(async () => {
    if (!token) return;

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
        console.error("Failed to fetch profile.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile, token]);

  const uploadImage = async (file) => {
    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("imageUrl", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profilePicture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: uploadData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const data = await response.json();

      // Update the profile picture
      await fetchProfile();

      return data.fileUrl;
    } catch (error) {
      console.error("Error while uploading file:", error);
      alert("Error uploading image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await uploadImage(file);
  };

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
          body: JSON.stringify({
            ...updatedData,
            profilePicture: profileData.profilePicture,
          }),
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

          <label
            style={{
              position: "relative",
              cursor: "pointer",
              display: "inline-block",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              src={profileData.profilePicture}
              alt="Profile"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                transition: "opacity 0.3s",
                opacity: uploading ? 0.5 : 1, // Dim image while uploading
              }}
            />
            {hover && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 100,
                  height: 100,
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Change Image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </label>

          {uploading && <p>Uploading...</p>}

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
