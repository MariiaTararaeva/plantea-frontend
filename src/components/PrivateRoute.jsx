import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, token } = useContext(SessionContext)
  if (!token) {
    return <Navigate to='/login' />
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return children
}

export default PrivateRoute
