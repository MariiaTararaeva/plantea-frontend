import { createContext, useEffect, useState, useCallback } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null); // Setting the user tha's logged in
  // Backlog improvement: Make sure to have a route to fetch your current user with a function in this context and call it where (and when) it is necessary. Backend route would have to work entirely with the token

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: { Authorization: `Bearer ${tokenToVerify}` },
        }
      );

      if (response.ok) {
        const userData = await response.json();

        setToken(tokenToVerify);
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        console.error("Verification  error:", response.status);
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Error:", error);
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  // -- NEW: Fetch the user's detailed profile from /api/users/profile
  const fetchUserProfile = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const profileData = await response.json();
        // Update user in context
        setUser(profileData);
      } else {
        console.error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [token]);

  // -- NEW: Upload profile picture and then refetch user data
  const uploadProfilePicture = async (file) => {
    if (!token) return;
    try {
      const uploadData = new FormData();
      uploadData.append("imageUrl", file);

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
        throw new Error("Failed to upload image");
      }

      // After successful upload, fetch the updated user profile
      await fetchUserProfile();
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      localStorage.setItem("authToken", token);
    } else {
      setToken();
      setIsAuthenticated(false);
    }
  }, [token]);

  useEffect(() => {
    const storageToken = localStorage.getItem("authToken");
    if (storageToken) {
      verifyToken(storageToken);
    } else {
      setIsLoading(false);
      localStorage.removeItem("authToken"); // optional
    }
  }, [token]);

  // On mount, verify if there's a token in localStorage
  useEffect(() => {
    const storageToken = localStorage.getItem("authToken");
    if (storageToken) {
      verifyToken(storageToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    setToken();
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <SessionContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        isLoading,
        user,
        setUser,
        logout,
        fetchUserProfile,
        uploadProfilePicture,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
