import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate } from 'react-router-dom'

const AnonymousRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(SessionContext)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isAuthenticated) {
    return <Navigate to='/profile' />
  }

  return children
}

export default AnonymousRoute
