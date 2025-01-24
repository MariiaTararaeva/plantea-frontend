import { createContext, useEffect, useState } from 'react'

export const SessionContext = createContext()

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [user, setUser] = useState(null); // 👈 Nuevo estado para almacenar los datos del usuario

  const verifyToken = async (tokenToVerify) => {
    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${tokenToVerify}` },
      });

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

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
      localStorage.setItem('authToken', token)
    } else {
      setToken()
      setIsAuthenticated(false)
    }
  }, [token])

  useEffect(() => {
    const storageToken = localStorage.getItem('authToken')
    if (storageToken) {
      verifyToken(storageToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  const logout = () => {
    setToken()
    setIsAuthenticated(false)
    localStorage.removeItem('authToken')
  }

  return (
    <SessionContext.Provider value={{ token, setToken, isAuthenticated, isLoading, user, setUser, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider
