import { useContext, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { useNavigate } from 'react-router-dom'

const NewBookPage = () => {
  const navigate = useNavigate()

  const { token } = useContext(SessionContext)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState(0)

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, author, pages }),
      })
      if (response.status === 201) {
        navigate('/books')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>New book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input required value={title} onChange={event => setTitle(event.target.value)} />
        </label>
        <label>
          Author
          <input required value={author} onChange={event => setAuthor(event.target.value)} />
        </label>
        <label>
          Number of pages
          <input
            required
            type='number'
            value={pages}
            onChange={event => setPages(event.target.value)}
          />
        </label>
        <button type='submit'>Add book</button>
      </form>
    </>
  )
}

export default NewBookPage
