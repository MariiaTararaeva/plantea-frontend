import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/PrivateRoute'
import AnonymousRoute from './components/AnonymousRoute'
import AllBooksPage from './pages/AllBooksPage'
import NewBookPage from './pages/NewBookPage'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<h1>Home page</h1>} />
        <Route
          path='/signup'
          element={
            <AnonymousRoute>
              <SignupPage />
            </AnonymousRoute>
          }
        />
        <Route
          path='/login'
          element={
            <AnonymousRoute>
              <LoginPage />
            </AnonymousRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path='/books/new'
          element={
            <PrivateRoute>
              <NewBookPage />
            </PrivateRoute>
          }
        />

        <Route path='/books' element={<AllBooksPage />} />

        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </>
  )
}

export default App
