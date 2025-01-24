import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext'

const AllBooksPage = () => {
  const { token } = useContext(SessionContext)

  const [books, setBooks] = useState([])

  const fetchAllBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      if (response.ok) {
        const booksData = await response.json()
        setBooks(booksData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllBooks()
  }, [])

  const handleDelete = async currentBookId => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${currentBookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 204) {
        fetchAllBooks()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>All books</h1>
      <ul>
        {books.map(currentBook => (
          <li key={currentBook._id}>
            <p>{currentBook.title}</p>
            <button type='button' onClick={() => handleDelete(currentBook._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllBooksPage
