import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(SessionContext)

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/books'>All books</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to='/books/new'>Add a Book</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <button type='button' onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
